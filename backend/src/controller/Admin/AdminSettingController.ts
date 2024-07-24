import AdminModel from "../../model/Admin/AdminModel";
import { Utils } from "../../utils/utils";
import { blueMailer } from "../../utils/blueMailer";
import { getEnv } from "../../environments/env";
import JWT from 'jsonwebtoken';
import BookingModel from "../../model/Client/Registration/BookingModel";
import { MailTemplate } from "../../utils/MailTemplate";

export class AdminSettingController {

    static async signUp(req, res) {
        try {
            const hash = await Utils.passwordHash('Admin@123!')

            await AdminModel.create({
                name: 'Admin',
                email: 'admin@malinator.com',
                password: hash,
                username: 'admin',
                created_at: Date.now(),
            });
            res.json({ status: 200, 'message': 'Login credentials have been sent to the registered Email!' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async EditSignUp(req, res) {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const user_id = req.body.user_id;

            const updatedPost = await AdminModel.findOneAndUpdate({ _id: user_id }, { email, username, created_at: new Date(), updated_at: new Date() });
            if (updatedPost) {
                res.json({ 'status': 200, 'message': 'Record Update Successfully' });
            } else {
                throw new Error('Service Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async signIn(req, res) {
        try {

            const password = req.body.password;
            const userDetails = req.user;

            await Utils.passwordCheckForLogin({ simplePassword: password, encryptPassword: userDetails.password });
            const encryptTokenDetails = { user_id: req.user._id, email_id: userDetails.email };
            const generatToken = JWT.sign(encryptTokenDetails, getEnv().jwt_secret_admin, { expiresIn: '10d' });
            res.status(200).json({ 'message': 'Your Account Login Successfully', 'status': true, 'Token': generatToken });
        } catch (e) {
            res.status(200).json({ 'message': 'Your Account Details Wrong', 'status': false });
        }
    }

    static async updatePassword(req, res: any) {
        try {
            const confirm_password = req.body.confirm_password;
            const current_password = req.body.current_password;
            const userDetails = req.userTokenDetails;

            const getUser: any = await AdminModel.findOne({ email: userDetails.email_id });
            await Utils.passwordCheckForLogin({ simplePassword: current_password, encryptPassword: getUser.password });
            const newPasswordEncrypted = await Utils.passwordHash(confirm_password);
            await AdminModel.updateOne({ email: userDetails.email_id }, { password: newPasswordEncrypted });
            res.status(200).json({ 'status': 200, 'message': 'password update Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async sendForgotPasswordEmail(req, res) {
        try {
            const email = req.body.email;
            const reset_password_token = Utils.generateVerificatioToken();
            const reset_password_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;

            let user: any = await AdminModel.findOneAndUpdate({ email: email }, { reset_password_token, reset_password_token_time });
            if (user) {
                await blueMailer.sendEmail({
                    to: user.email,
                    subject: 'Reset Your Password',
                    html: await MailTemplate.sendForgotPasswordTemplate({
                        mailfor: 'admin',
                        token: reset_password_token,
                        email: email,
                    }),
                })

                res.status(200).json({ 'status': 200, 'message': 'We have send mail on mail id Please check it' });
            } else {
                req.errorStatus = 202;
                throw new Error('User Does Not Exits');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async ResetPassword(req, res) {
        try {
            const email = req.body.email;
            const reset_password_token = req.body.reset_password_token;
            const confirm_password = req.body.confirm_password;

            let user: any = await AdminModel.findOne({ email: req.body.email, reset_password_token: reset_password_token, reset_password_token_time: { $gt: Date.now() } }).count();

            if (user > 0) {

                const newPasswordEncrypted = await Utils.passwordHash(confirm_password);
                await AdminModel.updateOne({ email: email }, { updated_at: new Date(), password: newPasswordEncrypted, reset_password_token_time: null, reset_password_token: null });
                res.status(200).json({ 'status': 200, 'message': 'Password reset Successfully' });
            } else {
                res.json({ 'status': false, 'Message': 'Your Link Expire' })
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getAllBooking(req, res) {
        try {

            const bookings = await BookingModel.aggregate([
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "consultant_bookid",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1, title: 1, email: 1 } }],
                        as: "ConsultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "client_bookid",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1, title: 1, email: 1 } }],
                        as: "clientDetails",
                    },
                },
                { $sort: { created_at: -1 } },
                {
                    $project: {
                        _id: 1, client_bookid: 1, amount: 1, fees: 1, book_date: 1, book_time: 1, orderId: 1, pdf_path: 1, paymentStatus: 1, paymentId: 1,
                        ConsultantDetails: { $arrayElemAt: ["$ConsultantDetails", 0] }, clientDetails: { $arrayElemAt: ["$clientDetails", 0] },
                    }
                }
            ]);

            if (bookings.length) {
                res.json({ status: 200, 'data': bookings });
            } else {
                res.json({ status: 200, 'message': 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}