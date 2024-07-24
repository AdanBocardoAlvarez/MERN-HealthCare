import { Utils } from "../../../utils/utils";
import JWT from 'jsonwebtoken';
import { getEnv } from "../../../environments/env";
import { blueMailer } from "../../../utils/blueMailer";
import ClientRegistrationModel from "../../../model/Client/Registration/ClientRegistrationModel";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import BookingModel from "../../../model/Client/Registration/BookingModel";
import ClientBasicDetails from "../../../model/Client/Registration/ClientBasicDetails";
import { MailTemplate } from "../../../utils/MailTemplate";
import NotesModel from "../../../model/Consultant/Registration/NotesModel";
import OtpValidation from "../../../model/OtpValidationModel";
import SaveClientModel from "../../../model/SaveClientModel";
import OtpValidationModel from "../../../model/OtpValidationModel";

export class ClientRegistrationController {

    static async saveClient(req, res) {
        try {

            if (!req.body.email) {
                res.status(500).json({ 'status': false, 'message': "Please provide your email address." });
            }

            let check = await SaveClientModel.findOne({ email: req.body.email })
            if (!check) {
                await SaveClientModel.create({ email: req.body.email });
            }

            res.status(200).json({ 'status': true, 'message': `Thanks for your interest.`, });
        } catch (error) {
            res.status(500).json({ 'status': false, 'message': error.message });
        }
    }

    static async signUp(req, res) {
        try {
            const UserCount = await ClientRegistrationModel.find().count()
            const paddedCounter = UserCount.toString().padStart(7, '0');
            const userUniqeCode = `CLIENT${paddedCounter + 1}`;

            const hash = await Utils.passwordHash(req.body.confirm_password)
            let userDetails = await ClientRegistrationModel.create({
                title: req.body.title,
                unique_code: userUniqeCode,
                family_name: req.body.family_name,
                given_name: req.body.given_name,
                gender: req.body.gender,
                timezone: req.body.timezone,
                DOB: req.body.DOB,
                email: req.body.email,
                country_of_residence: req.body.country_of_residence,
                city: req.body.city,
                contact_number: req.body.contact_number,
                contact_number_isd: req.body.contact_number_isd,
                preferred_type: req.body.preferred_type,
                password: hash,
                accept_tc_pp: req.body.accept_tc_pp,
                email_verify: 1,
                number_verify: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
            });

            if (isObjectIdOrHexString(userDetails._id)) {
                await OtpValidationModel.deleteMany({ mobileOrEmail: { $in: [req.body.email, req.body.contact_number] } });
                res.json({ 'status': 200, 'message': 'Your Account Created Successfully' });
            } else {
                res.json({ 'status': 500, 'message': 'Your Account Details Not Valid' });
            }
        } catch (error) {
            res.status(500).json({ 'status': 500, 'message': error.message });
        }
    }

    static async sendMobileOTP(req, res) {

        const mobile = req.body.number;
        const contact_number_isd = req.body.contact_number_isd;

        try {
            const OTP = Utils.generateVerificatioToken();

            await OtpValidation.deleteMany({ mobileOrEmail: mobile });
            await OtpValidation.create({ mobileOrEmail: mobile, otp: OTP })

            const message = `${OTP} is your verification code`;
            const respdata = await Utils.sendSMS(`${contact_number_isd}${mobile}`, message);
            if (respdata) {
                res.status(200).json({ 'status': true, 'message': `We Have Send OTP On Mobile Number ${mobile}`, data: respdata });
            } else {
                res.status(200).json({ 'status': false, 'message': `We are not able to send OTP at this moment.`, data: respdata });
            }
        } catch (error) {
            res.status(500).json({ 'status': 500, 'message': error.message });
        }
    }

    static async healthAssessmentDoc(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id;
            if (req.file) {
                let health_assessment = `/uploads/client_profile_image/${req.file.filename}`
                await ClientRegistrationModel.updateOne({ _id: UserId }, { health_assessment, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!', data: health_assessment });
            } else {
                res.json({ 'status': false, 'message': 'Please Provide PDF file.!!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consentFormDoc(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id
            if (req.file) {
                let consent_form = `/uploads/client_profile_image/${req.file.filename}`
                await ClientRegistrationModel.updateOne({ _id: UserId }, { consent_form, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!', data: consent_form });

            } else {
                res.json({ 'status': false, 'message': 'Please Provide PDF file.!!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async sendEmailOTP(req, res) {
        const email = req.body.email;
        try {
            const OTP = Utils.generateVerificatioToken();

            const Name = 'Member'
            const Contant = `Dear well being explorer, use this One Time Password <b>(${OTP})</b> to log in to your VhealTHY account.`

            await blueMailer.sendEmail({
                to: req.body.email,
                subject: 'VhealTHY Email Verify OTP',
                html: await MailTemplate.webTemplate({ Name, Contant }),
            })


            await OtpValidation.deleteMany({ mobileOrEmail: email });
            await OtpValidation.create({ mobileOrEmail: email, otp: OTP });
            res.status(200).json({ 'status': true, 'message': 'We Have Send OTP On your Email.', });
        } catch (error) {
            res.status(500).json({ 'status': 100, 'message': error.message, });
        }
    }

    static async editSignUp(req, res) {
        try {
            const UserCount = await ClientRegistrationModel.find({ id: req.userTokenDetails.user_id }).count()
            if (UserCount > 0) {
                await ClientRegistrationModel.updateOne({ id: req.userTokenDetails.user_id }, {
                    title: req.body.title,
                    family_name: req.body.family_name,
                    given_name: req.body.given_name,
                    gender: req.body.gender,
                    DOB: req.body.DOB,
                    email: req.body.email,
                    country: req.body.country,
                    city: req.body.city,
                    contact_number: req.body.contact_number,
                    contact_number_isd: req.body.contact_number_isd,
                    preferred_type: req.body.preferred_type,
                    updated_at: Date.now(),
                });

                res.json({ 'status': 200, 'message': 'Your Account Create Successfully' });
            } else {
                res.json({ 'status': 500, 'message': 'Your Account Not Valid' });
            }
        }
        catch (err) {
            res.json({ 'status': 500, 'message': err.message });
        }
    }

    static async signIn(req, res) {
        try {
            const password = req.body.password;
            const userDetails = req.user;

            await Utils.passwordCheckForLogin({ simplePassword: password, encryptPassword: userDetails.password });
            const encryptTokenDetails = {
                user_id: userDetails._id, unique_code: userDetails.unique_code, email_id: userDetails.email,
                contact_number: userDetails.contact_number, gender: userDetails.gender,
                verified_status: userDetails.verified_status, active_status: userDetails.active_status
            };
            const generatToken = JWT.sign(encryptTokenDetails, getEnv().jwt_secret_client, { expiresIn: '10d' });
            // update last login date
            res.status(200).json({ 'status': true, 'message': 'Login Successfully', 'Token': generatToken });
        } catch (error) {
            res.status(500).json({ 'status': 100, 'message': error.message, });
        }
    }

    static async clientadditionalDetails(req, res) {
        try {

            let preferred_type = req.body.preferred_type?.split(',');
            await ClientRegistrationModel.updateOne({ _id: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) }, {
                title: req.body.title,
                family_name: req.body.family_name,
                given_name: req.body.given_name,
                gender: req.body.gender,
                DOB: req.body.DOB,
                email: req.body.email,
                timezone: req.body.timezone,
                country_of_residence: req.body.country_of_residence,
                city: req.body.city,
                contact_number: req.body.contact_number,
                contact_number_isd: req.body.contact_number_isd,
                preferred_type: preferred_type,
                updated_at: Date.now(),
            });


            let toUpdate = {
                clientUserId: req.userTokenDetails.user_id,
                Correspondence_language: req.body.Correspondence_language,
                profession: req.body.profession,
                country_of_birth: req.body.country_of_birth,
                nationality: req.body.nationality,
                house_number: req.body.house_number,
                street_name: req.body.street_name,
                street_name2: req.body.street_name2,
                postal_code: req.body.postal_code,
                currency_used: req.body.currency_used,
                updated_at: new Date()
            }

            const count = await ClientBasicDetails.findOne({ clientUserId: req.userTokenDetails.user_id }).count();
            if (count > 0) {

                if (req.file) toUpdate = { ...toUpdate, ...{ profile_image: '/uploads/client_profile_image/' + req.file.filename } };

                await ClientBasicDetails.updateOne({ clientUserId: req.userTokenDetails.user_id }, toUpdate)
                return res.json({ 'status': 200, 'message': 'Profile Update Succssfully!' });

            } else {

                if (req.file) {
                    toUpdate = { ...toUpdate, ...{ profile_image: '/uploads/client_profile_image/' + req.file.filename } };
                } else {
                    toUpdate = { ...toUpdate, ...{ profile_image: '/uploads/client_profile_image/avatar.png' } };
                }

                await ClientBasicDetails.create(toUpdate);
                return res.json({ 'status': 200, 'message': 'Record Add Successfully!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getClientalDetails(req, res) {
        try {
            return res.json({ 'status': true, 'data': req.user });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async sendVerificationEmail(req, res) {
        const email = req.userTokenDetails.email_id;

        const verification_token = Utils.generateVerificatioToken();
        const verification_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;
        try {

            await ClientRegistrationModel.updateOne({ email: email, emailVrifyStatus: 0 }, { verify_email_token: verification_token, verify_email_token_time: verification_token_time });
            res.json({ sucess: true, message: 'We have send a OTP On Registered Mail Id. Please Check !' });
        } catch (error) {
            res.status(500).json({ 'status': 100, 'message': error.message, });
        }
    }

    static async getVerificationEmail(req, res) {
        const email = req.userTokenDetails.email_id;
        const verificationToken = req.query.verification_token;

        try {
            let user = await ClientRegistrationModel.findOneAndUpdate({
                // conditions
                email: email,
                verify_email_token: verificationToken,
                verify_email_token_time: { $gt: Date.now() }
            },
                // Update Value
                { emailVrifyStatus: 1 },
                { new: true });
            if (user) {
                res.json({ 'message': 'email verified successfully' });
            } else {
                throw new Error('Verification Token Is Expried. Please Request For a New One');
            }
        } catch (error) {
            res.status(500).json({ 'status': 100, 'message': error.message, });
        }
    }

    static async verify(req, res) {
        const email = req.userTokenDetails.email_id;
        const verificationToken = req.body.verification_token;
        try {
            let user = await ClientRegistrationModel.findOneAndUpdate({
                // conditions
                email: email,
                verify_email_token: verificationToken,
                verify_email_token_time: { $gt: Date.now() }
            },
                // Update Value
                { emailVrifyStatus: 1 },
                // return new user value
                { new: true });
            if (user) {
                res.send(user);
            } else {
                throw new Error('Verification Token Is Expried. Please Request For a New One');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async changePassword(req, res: any) {
        try {
            const new_password = req.body.new_password;
            const confirm_password = req.body.confirm_password;
            const current_password = req.body.current_password;
            const userDetails = req.userTokenDetails;

            if (confirm_password != new_password) {
                return res.status(500).json({ 'status': 100, 'message': `New and confrim password must be same.` });
            }

            await Utils.passwordCheckForLogin({ simplePassword: current_password, encryptPassword: req.user.password });
            const newPasswordEncrypted = await Utils.passwordHash(new_password);

            await ClientRegistrationModel.updateOne({ email: userDetails.email_id }, { password: newPasswordEncrypted });
            return res.status(200).json({ 'status': true, 'message': 'Password Update Successfully' });
        } catch (error) {
            return res.status(500).json({ 'status': false, 'message': error.message });
        }
    }

    static async sendResetPasswordEmail(req, res) {
        const email = req.body.email;
        const verification_token = Utils.generateVerificatioToken();
        const verification_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;

        try {
            let user: any = await ClientRegistrationModel.findOneAndUpdate({ email: email }, {
                reset_password_token: verification_token,
                reset_password_token_time: verification_token_time
            });

            if (user) {
                await blueMailer.sendEmail({
                    to: user.email,
                    subject: 'Reset Your Password',
                    html: await MailTemplate.sendForgotPasswordTemplate({
                        mailfor: 'client',
                        token: verification_token,
                        email: email,
                    }),
                });

                res.json({ sucess: true, message: 'We have send password reset link On Registered Mail Id. Please Check.!!' });
            }
            else {
                req.errorStatus = 202;
                throw new Error('User Does Not Exits');
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async resetPassword(req, res: any) {
        const confirm_password = req.body.confirm_password;
        const userDetails = req.user;

        try {
            const newPasswordEncrypted = await Utils.passwordHash(confirm_password);
            let user: any = await ClientRegistrationModel.findOneAndUpdate({ _id: userDetails._id },
                { updated_at: new Date(), password: newPasswordEncrypted },
                { new: true }
            );
            if (user) {
                res.json({ status: 200, message: 'Password Reset Successfully' });
            }
            else {
                req.errorStatus = 202;
                throw new Error('User Does Not Exits');
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getBooking(req, res) {
        try {
            var getRecord = await BookingModel.aggregate([
                { $match: { client_bookid: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "consultant_bookid",
                        foreignField: "_id",
                        pipeline: [{
                            $project: {
                                title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1,
                                email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1
                            }
                        }],
                        as: "ConsultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "consultant_bookid",
                        foreignField: "consultant_profileid",
                        pipeline: [{ $project: { _id: 0, profile_img: 1 } }],
                        as: "ProfileDetails",
                    },
                },
                { $sort: { created_at: -1 } },
                {
                    $project: {
                        _id: 1, consultant_bookid: 1, amount: 1, fees: 1, book_date: 1, book_time: 1, pdf_path: 1, paymentStatus: 1,
                        orderId: 1, paymentId: 1, signature: 1, ConsultantDetails: { $arrayElemAt: ["$ConsultantDetails", 0] },
                        profile_img: { $arrayElemAt: ["$ProfileDetails.profile_img", 0] },
                    }
                }
            ])

            var startHour = Utils.myMoment().startOf('hour');
            var endHour = Utils.myMoment().endOf('hour');
            getRecord = getRecord.map(row => {
                row.is_live = Utils.myMoment(row.book_date).isBetween(startHour, endHour, null, '[]');
                row.book_date = Utils.myMoment(row.book_date, req.user.timezone).format('lll | z')
                return row;
            });

            res.json({ 'status': 200, data: getRecord });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getPaymentHistory(req, res) {
        try {
            const getRecord = await BookingModel.aggregate([
                { $match: { client_bookid: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "consultant_bookid",
                        foreignField: "_id",
                        pipeline: [{ $project: { title: 1, unique_code: 1, given_name: 1 } }],
                        as: "ConsultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "client_bookid",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                        as: "ClientDetails",
                    },
                },
                {
                    $project:
                    {
                        _id: 1, created_at: 1, consultant_bookid: 1, amount: 1, fees: 1, book_date: 1,
                        book_time: 1, pdf_path: 1, orderId: 1, paymentId: 1, given_name: 1,
                        ConsultantDetails: 1, "ClientDetails": 1
                    }
                }
            ])

            res.json({ 'status': 200, data: getRecord });

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getClientProfile(req, res) {
        const UserId = req.userTokenDetails.user_id
        try {
            const getAllService = await ClientRegistrationModel.findOne({ _id: UserId }, {
                _id: 1, title: 1, unique_code: 1, family_name: 1,
                given_name: 1, gender: 1, DOB: 1, email: 1, contact_number_isd: 1, contact_number: 1, alternative_number_isd: 1, alternative_number: 1, contact_number_whatapp: 1,
                preferred_type: 1, verified_status: 1, active_status: 1
            });
            if (getAllService) {
                res.json({ 'status': 200, data: getAllService });
            }
            else {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            }

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSingleClient(req, res) {
        const userId = req.userTokenDetails.user_id;
        try {
            const getAllService = await ClientRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: "clientbasicdetails",
                        localField: "_id",
                        foreignField: "clientUserId",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country_of_birth",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "countryOfBirth",
                                },
                            },
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "Correspondence_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CorrespondenceLanguage",
                                },
                            },
                            {
                                $lookup: {
                                    from: "nationalities",
                                    localField: "nationality",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "nationalitys",
                                },
                            },
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country_of_residence",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CountryOfResidence",
                                },
                            },
                            {
                                $lookup: {
                                    from: "cities",
                                    localField: "city",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "City",
                                },
                            },
                        ],
                        as: "BasicDetails",
                    },
                },
                {
                    $project: {
                        title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1,
                        email: 1, contact_number: 1, alternative_number: 1, contact_number_isd: 1, alternative_number_isd: 1,
                        contact_number_whatapp: 1, preferred_type: 1, verified_status: 1, active_status: 1, "BasicDetails": 1,
                    }
                }
            ]);

            res.json({ 'status': true, data: getAllService });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSingleNote(req, res) {
        try {
            const CountRecord = await NotesModel.findOne({ sessionId: req.query.sessionId, clientId: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) });
            if (CountRecord) {
                res.json({ 'status': true, 'data': CountRecord });
            } else {
                res.json({ 'status': true, 'data': [], 'message': 'not Found Record' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}

