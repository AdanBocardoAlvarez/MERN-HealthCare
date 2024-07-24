

import { Utils } from "../../../utils/utils";
import JWT from 'jsonwebtoken';
import { getEnv } from "../../../environments/env";
import { blueMailer } from "../../../utils/blueMailer";
import { MailTemplate } from "../../../utils/MailTemplate";
import ConsultantRegistrationModel from "../../../model/Consultant/Registration/ConsultantRegistrationModel";
import ConsultantBasicDetails from "../../../model/Consultant/Registration/ConsultantBasicDetails";
import ConsultantBankDetailsModel from "../../../model/Consultant/Registration/ConsultantBankDetailsModel";
import ConsultantEducationDetailsModel from "../../../model/Consultant/Registration/ConsultantEducationDetailsModel";
import ConsultantAddressDetailsModel from "../../../model/Consultant/Registration/ConsultantAddressDetailsModel";
import ConsultantProfileAndKeywordDetailsModel from "../../../model/Consultant/Registration/ConsultantProfileAndKeywordDetailsModel";
import ConsultantTimeSlotTwoModel from "../../../model/Consultant/Registration/ConsultantTimeSlotTwoModel"
import ConsultantTimeSlotModel from "../../../model/Consultant/Registration/ConsultantTimeSlotModel";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import ConsultantModifyTimeSlotModel from "../../../model/Consultant/Registration/ConsultantModifyTimeSlotModel";
import ConsultantCertificateModel from "../../../model/Consultant/Registration/ConsultantCertificateModel";
import NotesModel from "../../../model/Consultant/Registration/NotesModel";
import OtpValidationModel from "../../../model/OtpValidationModel";
import ConsultantEducation from "../../../model/Consultant/Registration/ConsultantEducation";

export class ConsultantRegistrationController {

    static async signUp(req, res) {
        try {
            const UserCount = await ConsultantRegistrationModel.find().count()
            const paddedCounter = UserCount.toString().padStart(7, '0');
            const userUniqeCode = `DOC${paddedCounter + 1}`;

            const hash = await Utils.passwordHash(req.body.confirm_password)
            let { title, family_name, given_name, gender, DOB, timezone, email, contact_number_isd, alternative_number_isd, contact_number, alternative_number, contact_number_whatapp, alternative_number_whatapp, preferred_type } = req.body;

            let userDetails = await ConsultantRegistrationModel.create({
                title, family_name, given_name, gender, DOB, timezone, email, contact_number_isd, alternative_number_isd, contact_number, alternative_number, contact_number_whatapp, alternative_number_whatapp, preferred_type,
                unique_code: userUniqeCode,
                password: hash,
                accept_tc_pp: req.body.accept_tc_pp ? 0 : 1,
                email_verify: 1,
                number_verify: 1,
                created_at: Date.now(),
                updated_at: Date.now(),
            });

            if (isObjectIdOrHexString(userDetails._id)) {
                const Name = req.body.given_name
                const Contant = `We are delighted to confirm your registration with VhealTHY! Your information is currently under review. Upon submission of all mandatory documents on the dashboard as stipulated in the contract, you shall be soon set to provide wellbeing services on the VhealTHY platform.              
                Meanwhile, do not hesitate to share your Vhealthy profile within your network!`

                await blueMailer.sendEmail({
                    to: req.body.email,
                    subject: 'Welcome to VhealTHY - Registration Received',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                });

                // const MobileNumber = `${contact_number_isd}${req.body.contact_number}`
                // const SmsMessage = "Registration: Welcome to Vhealthy! Your registration is confirmed. Get ready to provide wellbeing services."
                // const smsRespone = await Utils.sendSMS(MobileNumber, SmsMessage);

                await OtpValidationModel.deleteMany({ mobileOrEmail: { $in: [email, contact_number] } });
                res.json({ 'status': 200, 'message': 'Your Account Create Successfully' });
            } else {
                res.json({ 'status': 500, 'message': 'Your Account Not Valid' });
            }
        } catch (err) {
            res.json({ 'status': 500, 'message': err.message });
        }
    }

    static async signIn(req, res) {
        try {

            const userDetails = req.user;
            const checkPass = await Utils.passwordCheckForLogin({ simplePassword: req.body.password, encryptPassword: userDetails.password });
            if (checkPass) {

                // if (userDetails.active_status == 2)
                //     return res.status(200).json({ 'message': 'Your Account Has Been Suspended By Admin. Please Contact Admin', 'status': false });

                // if (userDetails.active_status == 0)
                //     return res.status(200).json({ 'message': 'Your Account Has Been Deactive By Admin. Please Contact Admin', 'status': false });

                let userID = new mongoose.Types.ObjectId(userDetails._id);
                let BasicDetails = await ConsultantBasicDetails.findOne({ 'consultantUserId': userID }).count();
                let AddressDetails = await ConsultantAddressDetailsModel.findOne({ 'consultant_address': userID }).count();
                let BankDetails = await ConsultantBankDetailsModel.findOne({ 'consultant_bankUser': userID }).count();
                let CertificateDetail = await ConsultantCertificateModel.findOne({ 'userCertificate': userID }).count();
                let ProfileDetail = await ConsultantProfileAndKeywordDetailsModel.findOne({ 'consultant_profileid': userID }).count();
                let EducationDetails = await ConsultantEducationDetailsModel.findOne({ 'userEducation': userID }).count();
                let TimeSlotDetails = await ConsultantTimeSlotModel.findOne({ 'consultantTimeId': userID }).count();

                const encryptTokenDetails = {
                    title: userDetails.title, family_name: userDetails.family_name, given_name: userDetails.given_name,
                    user_id: userDetails._id, unique_code: userDetails.unique_code, email_id: userDetails.email,
                    contact_number: userDetails.contact_number, gender: userDetails.gender,
                    verified_status: userDetails.verified_status, active_status: userDetails.active_status,
                };

                const generatToken = JWT.sign(encryptTokenDetails, getEnv().jwt_secret_consultant, { expiresIn: '10d' });

                res.status(200).json({
                    'message': 'Login Successfully', 'status': true,
                    'Token': generatToken,
                    'verified_status': userDetails.verified_status,
                    'active_status': userDetails.active_status,
                    BasicDetails: BasicDetails,
                    AddressDetails: AddressDetails,
                    BankDetails: BankDetails,
                    CertificateDetail: CertificateDetail,
                    ProfileDetail: ProfileDetail,
                    EducationDetails: EducationDetails,
                    TimeSlotDetails: TimeSlotDetails,
                });
            } else {
                res.status(500).json({ 'message': "Invalid Credentials", 'status': false });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async sendMobileOTP(req, res) {
        const mobile = req.body.number;
        const contact_number_isd = req.body.contact_number_isd;

        try {
            const OTP = Utils.generateVerificatioToken();

            await OtpValidationModel.deleteMany({ mobileOrEmail: mobile });
            await OtpValidationModel.create({ mobileOrEmail: mobile, otp: OTP });

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

            await OtpValidationModel.deleteMany({ mobileOrEmail: email });
            await OtpValidationModel.create({ mobileOrEmail: email, otp: OTP });
            res.status(200).json({ 'status': true, 'message': 'We Have Send OTP On Email Id' });
        }
        catch (error) {
            res.status(500).json({ 'status': 500, 'message': error.message, });
        }
    }

    // Checked Apis
    static async getConsultantBasicDetails(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id;
            const result = await ConsultantBasicDetails.findOne({ consultantUserId: UserId }).exec();
            if (result) {
                const { title, family_name, given_name, gender, DOB, preferred_type, timezone } = req.user;
                let updatedResult = { ...result.toJSON({ getters: true }), title, family_name, given_name, gender, DOB, preferred_type, timezone }
                res.json({ 'status': true, 'message': 'Data Received Successfully!', 'data': updatedResult });
            } else {
                res.json({ 'status': false, 'message': 'No Record More!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': 'Something went wrong..!!' });
        }
    }

    static async documentUpload(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id
            if (req.file) {
                let document = `/uploads/consultant_profile_image/${req.file.filename}`
                await ConsultantRegistrationModel.updateOne({ _id: UserId }, { document, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!', data: document });

            } else {
                res.json({ 'status': false, 'message': 'No Record More!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantAddressDetails(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id
            const count = await ConsultantAddressDetailsModel.findOne({ consultant_address: UserId }).count();
            if (count > 0) {
                const result = await ConsultantAddressDetailsModel.findOne({ consultant_address: UserId })
                res.json({ 'status': true, 'data': result.toJSON({ getters: true }), 'message': 'Data Received Successfully' });
            } else {
                res.json({ 'status': false, 'message': 'No Record More!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantBankDetails(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id
            const count = await ConsultantBankDetailsModel.findOne({ consultant_bankUser: UserId }).count();
            if (count > 0) {
                const result = await ConsultantBankDetailsModel.findOne({ consultant_bankUser: UserId })
                res.json({ 'status': true, 'data': result.toJSON({ getters: true }), 'message': 'Data Received Successfully!' });
            } else {
                res.json({ 'status': false, 'message': 'No Record More!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantEducationDetails(req, res) {
        try {

            const UserId = req.userTokenDetails.user_id
            const count = await ConsultantEducationDetailsModel.findOne({ userEducation: UserId }).count();
            if (count > 0) {
                const result = await ConsultantEducationDetailsModel.findOne({ userEducation: UserId })
                res.json({ 'status': true, 'data': result.toJSON({ getters: true }), 'message': 'Data Received Successfully' });
            } else {
                res.json({ 'status': false, 'message': 'No Record More!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantEducationList(req, res) {
        try {

            const data = await ConsultantEducation.aggregate([
                { $match: { consultant_id: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) } },
                {
                    $lookup: {
                        from: "countries",
                        localField: "country",
                        foreignField: "_id",
                        pipeline: [
                            { $project: { name: 1 } },
                        ],
                        as: "country_name",
                    },
                },
                { $set: { country_name: { $arrayElemAt: ["$country_name.name", 0] } } },

            ]);

            res.json({ 'status': true, 'data': data });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async addEducation(req, res) {
        try {

            const data = await ConsultantEducation.create({
                consultant_id: req.userTokenDetails.user_id,
                degree_name: req.body.degree_name,
                school_name: req.body.school_name,
                year_of_graduation: req.body.year_of_graduation,
                country: req.body.country,
                attachment: `/uploads/degree_doc_image/${req.file.filename}`,

            });

            res.json({ 'status': true, 'message': "Degree added successfully..!!", 'data': data.toJSON({ getters: true }) });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async editEducation(req, res) {
        try {

            type IData = {
                degree_name: string,
                school_name: string,
                year_of_graduation: string,
                country: string,
                attachment?: string,
            }

            let { degree_name, school_name, year_of_graduation, country } = req.body;
            let vData: IData = { degree_name, school_name, year_of_graduation, country }

            if (req.file && req.file.filename) {
                vData.attachment = '/uploads/degree_doc_image/' + req.file.filename;
            }

            await ConsultantEducation.updateOne({ _id: req.query.id, consultant_id: req.userTokenDetails.user_id }, vData);
            res.json({ 'status': true, 'message': 'Degree Updated Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async deleteEducation(req, res) {
        try {
            await ConsultantEducation.findOneAndDelete({ _id: req.query.id, consultant_id: req.userTokenDetails.user_id });
            res.json({ 'status': true, 'message': 'Degree Deleted Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async GetAllCertificateDetails(req, res) {
        try {
            const Service = await ConsultantCertificateModel.find({ userCertificate: req.userTokenDetails.user_id });
            res.json({ 'status': true, 'data': Service.map(row => row.toJSON({ getters: true })) });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async GetSingleCertificateDetails(req, res) {
        try {
            const Service = await ConsultantCertificateModel.findOne({ _id: req.query.id, userCertificate: req.userTokenDetails.user_id });
            if (Service) {
                res.json({ 'status': true, 'data': Service.toJSON({ getters: true }) });
            } else {
                res.json({ 'status': false, 'message': "Record Not found." });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getProfileAndKeywordsDetails(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id
            const count = await ConsultantProfileAndKeywordDetailsModel.findOne({ consultant_profileid: UserId }).count();
            if (count) {
                const user = await ConsultantProfileAndKeywordDetailsModel.findOne(
                    { consultant_profileid: UserId },
                    { profile_img: 1, bio: 1, professionalCounseling: 1, intro_vedio: 1, keywords: 1, Objectives: 1 });
                res.json({ 'status': 200, 'data': user.toJSON({ getters: true }) });
            } else {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getTimeSlot(req, res) {
        try {
            const result = await ConsultantTimeSlotModel.findOne({ consultantTimeId: req.userTokenDetails.user_id })
            if (result) {
                res.json({ 'status': 200, 'data': result.toJSON({ getters: true }) });
            } else {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantBasicDetails(req, res) {

        try {
            const count = await ConsultantBasicDetails.findOne({ consultantUserId: req.userTokenDetails.user_id }).count();

            let { Correspondence_language, profession, country_of_birth, nationality, id_number, year_of_experience, criminal_record } = req.body;
            let spoken_language = req.body.spoken_language?.split(',');

            let { title, family_name, given_name, gender, DOB, timezone } = req.body

            type IVdata = {
                id_number_attachment?: any;
                consultantUserId: any,
                Correspondence_language,
                spoken_language: any,
                profession: any,
                country_of_birth: any,
                nationality: any,
                id_number: any,
                year_of_experience: any,
                criminal_record: any,
            }

            let vData: IVdata = {
                consultantUserId: req.userTokenDetails.user_id,
                Correspondence_language, spoken_language, profession, country_of_birth, nationality, id_number, year_of_experience, criminal_record,
            }

            if (req.files?.id_number_attachment && req.files?.id_number_attachment.length > 0)
                vData.id_number_attachment = '/uploads/criminal_record_image/' + req.files?.id_number_attachment[0].filename;

            await ConsultantRegistrationModel.updateOne({ _id: req.userTokenDetails.user_id }, {
                title, family_name, given_name, gender, DOB, timezone
            });

            if (count > 0) {
                await ConsultantBasicDetails.updateOne({ consultantUserId: req.userTokenDetails.user_id }, { ...vData, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!' });
            } else {
                await ConsultantBasicDetails.create({ ...vData, created_at: new Date() });
                res.json({ 'status': 200, 'message': 'Record Add Successfully!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantBankDetails(req, res) {
        try {

            const count = await ConsultantBankDetailsModel.findOne({ consultant_bankUser: req.userTokenDetails.user_id }).count();
            let { payment_currency, tax_information, country, bank_name, bank_Agency_name, agency_address, swift_code, account_number, branch_code, Iban, control_key, account_holder_name, account_currency } = req.body;

            type IVdata = {
                consultant_bankUser: any,
                payment_currency: any,
                tax_information: any,
                country: any,
                bank_name: any,
                bank_Agency_name: any,
                agency_address: any,
                swift_code: any,
                account_number: any,
                branch_code: any,
                Iban: any,
                control_key: any,
                account_holder_name: any,
                account_currency: any,
                add_bank_information?: any,
            }

            let vData: IVdata = {
                consultant_bankUser: req.userTokenDetails.user_id,
                payment_currency, tax_information, country, bank_name, bank_Agency_name, agency_address,
                swift_code, account_number, branch_code, Iban, control_key, account_holder_name, account_currency,
            }

            if (req.files.length > 0 && req.files?.[0]?.filename)
                vData.add_bank_information = '/uploads/bank_document_image/' + req.files?.[0]?.filename;

            if (count > 0) {
                await ConsultantBankDetailsModel.updateOne({ consultant_bankUser: req.userTokenDetails.user_id }, { ...vData, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!' });

            } else {

                await ConsultantBankDetailsModel.create({ ...vData, created_at: new Date() });
                res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
            }

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantEducationDetails(req, res) {

        try {
            // const count = await ConsultantEducationDetailsModel.findOne({ userEducation: req.userTokenDetails.user_id }).count();
            // let { gra_degree_name, gra_school_name, gra_year_of_graduation, gra_country, gra_num_of_degree, post_degree_name, post_school_name, post_year_of_graduation, post_num_of_degree, edu_specialization, edu_disorders } = req.body;

            // type IVdata = {
            //     userEducation: string,
            //     gra_degree_name: string,
            //     gra_school_name: string,
            //     gra_year_of_graduation: string,
            //     gra_country: string,
            //     gra_num_of_degree: string,
            //     post_degree_name: string,
            //     post_school_name: string,
            //     post_year_of_graduation: string,
            //     post_num_of_degree: string,
            //     edu_specialization: string[],
            //     edu_disorders: string[],
            //     post_country?: string,
            //     gra_degree_attachment?: string,
            //     post_degree_attachment?: string,
            //     edu_resume?: string,
            // }

            // edu_specialization = edu_specialization?.split(',');
            // edu_disorders = edu_disorders?.split(',');

            // let vData: IVdata = {
            //     userEducation: req.userTokenDetails.user_id,
            //     gra_degree_name,
            //     gra_school_name,
            //     gra_year_of_graduation,
            //     gra_country,
            //     gra_num_of_degree,
            //     post_degree_name,
            //     post_school_name,
            //     post_year_of_graduation,
            //     post_num_of_degree,
            //     edu_specialization,
            //     edu_disorders,
            //     post_country: (isObjectIdOrHexString(req.body.post_country) ? req.body.post_country : null),
            // }

            // if (req.files?.gra_degree_attachment && req.files.gra_degree_attachment.length > 0)
            //     vData.gra_degree_attachment = '/uploads/degree_doc_image/' + req.files?.gra_degree_attachment[0].filename;

            // if (req.files?.post_degree_attachment && req.files.post_degree_attachment.length > 0)
            //     vData.post_degree_attachment = '/uploads/degree_doc_image/' + req.files?.post_degree_attachment[0].filename;


            let vData: { edu_specialization: string[], edu_disorders: string[], edu_resume?: string } = {
                edu_specialization: req.body.edu_specialization?.split(','),
                edu_disorders: req.body.edu_disorders?.split(','),
            }

            if (req.file && req.file.filename) vData.edu_resume = '/uploads/degree_doc_image/' + req.file.filename;

            const count = await ConsultantEducationDetailsModel.findOne({ userEducation: req.userTokenDetails.user_id }).count();
            if (count > 0) {
                await ConsultantEducationDetailsModel.updateOne({ userEducation: req.userTokenDetails.user_id }, { ...vData, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!' });
            } else {
                await ConsultantEducationDetailsModel.create({ ...vData, created_at: new Date() });
                res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
            }

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantCertificateDetails(req, res) {
        try {

            let certificate_attachment = null;
            if (req.file && req.file.filename) {
                certificate_attachment = '/uploads/consultant_certificate/' + req.file.filename;
            }

            const { name, certificate_name, year_of_certificate, num_of_certificate } = req.body;
            await ConsultantCertificateModel.create({
                userCertificate: req.userTokenDetails.user_id,
                name,
                certificate_name,
                year_of_certificate,
                num_of_certificate,
                certificate_attachment,
                created_at: new Date(),
            });

            res.json({ 'status': true, 'message': 'Certificate Add Successfull' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async EditCertificateDetails(req, res) {
        try {

            type IData = { name: any, certificate_name: any, year_of_certificate: any, num_of_certificate: any, certificate_attachment?: any }

            let { name, certificate_name, year_of_certificate, num_of_certificate } = req.body;
            let vData: IData = { name, certificate_name, year_of_certificate, num_of_certificate }

            if (req.files.length > 0 && req.files?.[0].filename) {
                vData.certificate_attachment = '/uploads/consultant_certificate/' + req.files[0].filename;
            }

            await ConsultantCertificateModel.updateOne({ _id: req.body.id, userCertificate: req.userTokenDetails.user_id }, vData);
            res.json({ 'status': true, 'message': 'Certificate Update Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async DeleteCertificateDetails(req, res) {
        try {
            await ConsultantCertificateModel.findOneAndDelete({ _id: req.query.id, userCertificate: req.userTokenDetails.user_id });
            res.json({ 'status': true, 'message': 'Certificate Delete Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async setUpProfileAndKeywordsDetails(req, res) {
        try {
            const count = await ConsultantProfileAndKeywordDetailsModel.findOne({ consultant_profileid: req.userTokenDetails.user_id }).count();

            let keywords = req.body.keywords?.split(',');
            let Objectives = req.body.Objectives?.split(',');
            let { bio, professionalCounseling, intro_vedio } = req.body;

            type IVdata = { consultant_profileid: any, bio: any, professionalCounseling: any, intro_vedio: any, keywords: any, Objectives: any, profile_img?: any }
            let vData: IVdata = { consultant_profileid: req.userTokenDetails.user_id, bio, professionalCounseling, intro_vedio, keywords, Objectives }

            if (req.file && req.file?.filename) {
                vData.profile_img = '/uploads/consultant_profile_image/' + req.file.filename;
            }

            if (count > 0) {
                await ConsultantProfileAndKeywordDetailsModel.updateOne({ consultant_profileid: req.userTokenDetails.user_id }, { ...vData, updated_at: new Date() });
                res.json({ 'status': 200, 'message': 'Details Updated Successfully!' });
            } else {

                await ConsultantProfileAndKeywordDetailsModel.create({ ...vData, created_at: new Date() });
                res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
            }

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantAddressDetails(req, res) {
        try {
            const count = await ConsultantAddressDetailsModel.findOne({ consultant_address: req.userTokenDetails.user_id }).count();
            let { house_number, street_name, street_name2, postal_code, city, country_of_residence } = req.body

            if (count > 0) {

                await ConsultantAddressDetailsModel.updateOne({ consultant_address: req.userTokenDetails.user_id }, {
                    consultant_address: req.userTokenDetails.user_id,
                    house_number, street_name, street_name2, postal_code, city, country_of_residence,
                    updated_at: new Date()
                });

                res.json({ 'status': 200, 'message': 'Profile Update Succssfully!' });

            } else {

                await ConsultantAddressDetailsModel.create({
                    consultant_address: req.userTokenDetails.user_id,
                    house_number, street_name, street_name2, postal_code, city, country_of_residence,
                    created_at: new Date(),
                });

                res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
            }

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantTimeSlotDetails(req, res) {
        try {

            const record = await ConsultantTimeSlotModel.findOne({ consultantTimeId: req.userTokenDetails.user_id });
            var Service: any = null;
            if (record) {
                if (req.body.Day == "Sunday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Sunday: req.body.TimeSlot[0] }, { new: true });
                } else if (req.body.Day == "Monday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Monday: req.body.TimeSlot[0] }, { new: true });
                } else if (req.body.Day == "Tuesday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Tuesday: req.body.TimeSlot[0] }, { new: true });
                } else if (req.body.Day == "Wednesday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Wednesday: req.body.TimeSlot[0] }, { new: true });
                } else if (req.body.Day == "Thursday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Thursday: req.body.TimeSlot[0] }, { new: true });
                } else if (req.body.Day == "Friday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Friday: req.body.TimeSlot[0] }, { new: true });
                } else if (req.body.Day == "Saturday") {
                    Service = await ConsultantTimeSlotModel.findOneAndUpdate({ consultantTimeId: req.userTokenDetails.user_id }, { Saturday: req.body.TimeSlot[0] }, { new: true });
                }

                res.json({ 'status': true, 'message': 'Schedule Update Successfully', 'data': Service });
            } else {
                if (req.body.Day == "Sunday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Sunday: req.body.TimeSlot[0] });
                } else if (req.body.Day == "Monday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Monday: req.body.TimeSlot[0] });
                } else if (req.body.Day == "Tuesday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Tuesday: req.body.TimeSlot[0] });
                } else if (req.body.Day == "Wednesday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Wednesday: req.body.TimeSlot[0] });
                } else if (req.body.Day == "Thursday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Thursday: req.body.TimeSlot[0] });
                } else if (req.body.Day == "Friday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Friday: req.body.TimeSlot[0] });
                } else if (req.body.Day == "Saturday") {
                    Service = await ConsultantTimeSlotModel.create({ consultantTimeId: req.userTokenDetails.user_id, Saturday: req.body.TimeSlot[0] });
                }

                res.json({ 'status': 200, 'message': 'Details Add Successfully!', 'data': Service });
            }

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async consultantModifyTimeSlotDetails(req, res) {
        try {
            const count = await ConsultantModifyTimeSlotModel.findOne({ consultantModifyTimeId: req.userTokenDetails.user_id }).count();
            if (count > 0) {
                await ConsultantModifyTimeSlotModel.updateOne({ consultantModifyTimeId: req.userTokenDetails.user_id }, { Date: req.body.Date, ModifyTimeSlot: req.body.TimeSlot[0] });
                res.json({ 'status': true, 'message': 'Schedule Update Successfully' });
            } else {

                await ConsultantModifyTimeSlotModel.create({ consultantModifyTimeId: req.userTokenDetails.user_id, Date: req.body.Date, ModifyTimeSlot: req.body.TimeSlot[0] });
                res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': `Something went wrong! ${error}` });
        }
    }

    static async consultantTimeSlotDetails2(req, res) {
        await ConsultantTimeSlotTwoModel.create({
            consultantTimeId: req.userTokenDetails.user_id,
            SlotTime: req.body.SlotDurations,
            Day: req.body.Day,
            SlotArray: req.body.TimeSlot,
        });
        res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
    }

    static async consultantProfileDetails(req, res) {
        try {
            const userId = req.userTokenDetails.user_id;
            const getAllService = await ConsultantRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
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
                                    as: "nationality",
                                },
                            },
                            {
                                $project: {
                                    _id: 0, spoken_language: 1, profession: 1, id_number: 1,
                                    id_number_attachment: 1, year_of_experience: 1, criminal_record: 1, criminal_record_attachment: 1,
                                    countryOfBirth: 1, CorrespondenceLanguage: 1, nationality: 1
                                }
                            }
                        ],
                        as: "BasicDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantfeesdetails",
                        localField: "_id",
                        foreignField: "ConsultantID",
                        pipeline: [
                            { $project: { _id: 0, fees: 1 } }
                        ],
                        as: "consultantFees",
                    },
                },
                {
                    $lookup: {
                        from: "consultantaddressdetails",
                        localField: "_id",
                        foreignField: "consultant_address",
                        pipeline: [
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

                            {
                                $project: {
                                    _id: 0, house_number: 1, street_name: 1,
                                    street_name2: 1, postal_code: 1, CountryOfResidence: 1, City: 1
                                }
                            }
                        ],
                        as: "AddressDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantbankdetails",
                        localField: "_id",
                        foreignField: "consultant_bankUser",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CountryName",
                                },
                            },
                            {
                                $project: {
                                    _id: 0, payment_currency: 1, tax_information: 1,
                                    bank_name: 1, bank_Agency_name: 1, agency_address: 1, swift_code: 1,
                                    account_number: 1, branch_code: 1, Iban: 1, control_key: 1, account_holder_name: 1,
                                    account_currency: 1, add_bank_information: 1, country: 1, CountryName: 1
                                }
                            }
                        ],
                        as: "BankDetails",
                    },
                },
                // {
                //     $lookup: {
                //         from: "consultanteducationdetails",
                //         localField: "_id",
                //         foreignField: "userEducation",
                //         pipeline: [
                //             {
                //                 $lookup: {
                //                     from: "countries",
                //                     localField: "gra_country",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "graduate_country",
                //                 },
                //             },
                //             {
                //                 $lookup: {
                //                     from: "countries",
                //                     localField: "post_country",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "post_country",
                //                 },
                //             },
                //             {
                //                 $lookup: {
                //                     from: "specializations",
                //                     localField: "edu_specialization",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "SpecializationName",
                //                 },
                //             },
                //             {
                //                 $lookup: {
                //                     from: "disorders",
                //                     localField: "edu_disorders",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "disorderName",
                //                 },
                //             },
                //             {
                //                 $project: {
                //                     _id: 0, gra_degree_name: 1, gra_school_name: 1,
                //                     gra_year_of_graduation: 1, gra_num_of_degree: 1, gra_degree_attachment: 1, post_degree_name: 1,
                //                     post_school_name: 1, post_year_of_graduation: 1, post_num_of_degree: 1, post_degree_attachment: 1,
                //                     edu_specialization: 1, edu_disorders: 1, edu_resume: 1,
                //                     graduate_country: 1, post_country: 1, disorderName: 1, SpecializationName: 1
                //                 }
                //             }
                //         ],
                //         as: "EducationDetails",
                //     },
                // },

                {
                    $lookup: {
                        from: "consultanteducationdetails",
                        localField: "_id",
                        foreignField: "userEducation",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "specializations",
                                    localField: "edu_specialization",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpecializationName",
                                },
                            },
                            {
                                $lookup: {
                                    from: "disorders",
                                    localField: "edu_disorders",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "disorderName",
                                },
                            },
                            {
                                $project: { edu_specialization: 1, edu_disorders: 1, edu_resume: 1, disorderName: 1, SpecializationName: 1 }
                            }
                        ],
                        as: "EducationDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultanteducations",
                        localField: "_id",
                        foreignField: "consultant_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country",
                                    foreignField: "_id",
                                    pipeline: [
                                        { $project: { name: 1 } },
                                    ],
                                    as: "country_name",
                                },
                            },
                            { $set: { country_name: { $arrayElemAt: ["$country_name.name", 0] } } },
                        ],
                        as: "consultantDegrees",
                    },
                },
                {
                    $lookup: {
                        from: "consultanttimeslots",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0, SlotTime: 1, Sunday: 1,
                                    Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1,
                                    Friday: 1, Saturday: 1
                                }
                            }
                        ],
                        as: "TimeSlot",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [{ $project: { _id: 0, profile_img: 1, bio: 1, intro_vedio: 1, keywords: 1, Objectives: 1 } }],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [
                            { $unwind: "$keywords" },
                            {
                                $lookup: {
                                    from: "keywords",
                                    localField: "keywords",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { _id: 0, name: 1 } }],
                                    as: "KeyWordName",
                                },
                            },
                            { $unwind: "$KeyWordName" },
                            {
                                $group: {
                                    _id: null,
                                    keywordsName: { $push: "$KeyWordName" }
                                }
                            },
                            { $project: { _id: 0, keywordsName: "$keywordsName.name" } }
                        ],
                        as: "KeyWordNameUseByConsultant",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [
                            { $unwind: "$Objectives" },
                            {
                                $lookup: {
                                    from: "objectives",
                                    localField: "Objectives",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { _id: 0, name: 1 } }],
                                    as: "ObjectiveName",
                                },
                            },
                            { $unwind: "$ObjectiveName" },
                            {
                                $group: {
                                    _id: null,
                                    ObjectiveName: { $push: "$ObjectiveName" }
                                }
                            },
                            { $project: { _id: 0, ObjectiveName: "$ObjectiveName.name" } }
                        ],
                        as: "ObjectiveUseByConsultant",
                    },
                },
                {
                    $project: {
                        title: 1, document: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number: 1, alternative_number: 1,
                        contact_number_isd: 1, alternative_number_isd: 1, "Fees": "$consultantFees.fees",
                        contact_number_whatapp: 1, preferred_type: 1, verified_status: 1, active_status: 1, "BasicDetails": 1, "AddressDetails": 1, "BankDetails": 1, "EducationDetails": 1, "consultantDegrees": 1, "TimeSlot": 1, "ProfileAndKeyword": 1, "ObjectiveUseByConsultant": "$ObjectiveUseByConsultant.ObjectiveName", "KeyWordNameUseByConsultant": "$KeyWordNameUseByConsultant.keywordsName",
                    }
                }
            ]);

            res.json({ 'status': true, data: getAllService });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async sendVerificationEmail(req, res) {
        try {
            const email = req.query.email_id;

            const verification_token = Utils.generateVerificatioToken();
            const verification_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;
            await ConsultantRegistrationModel.updateOne({ email: email, email_verify: 0 }, { verify_email_token: verification_token, verify_email_token_time: verification_token_time });
            res.json({ sucess: true, message: 'We have send a OTP On Registered Mail Id. Please Check !' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getVerificationEmail(req, res) {
        const email = req.userTokenDetails.email_id;
        const verificationToken = req.query.verification_token;

        try {
            let user = await ConsultantRegistrationModel.updateOne({
                email: email,
                verify_email_token: verificationToken,
                verify_email_token_time: { $gt: Date.now() }
            }, { emailVrifyStatus: 1 }, { new: true });
            if (user) {
                res.json({ 'message': 'email verified successfully' });
            } else {
                throw new Error('Verification Token Is Expried. Please Request For a New One');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async verify(req, res) {
        const email = req.userTokenDetails.email_id;
        const verificationToken = req.body.verification_token;
        try {
            let user = await ConsultantRegistrationModel.findOneAndUpdate({
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

    static async RegistrationEmailverifyEmail(req, res) {
        const email = req.query.email_id;
        const verification_token = Utils.generateVerificatioToken();
        const verification_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;
        try {
            await ConsultantRegistrationModel.updateOne({ email: email, email_verify: 0 }, { verify_email_token: verification_token, verify_email_token_time: verification_token_time });
            res.json({ sucess: true, message: 'We have send a OTP On Registered Mail Id. Please Check !' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async RegistrationVerificationEmail(req, res) {
        const email = req.userTokenDetails.email_id;
        const verificationToken = req.query.verification_token;

        try {
            let user = await ConsultantRegistrationModel.findOneAndUpdate({
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
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async Registrationverify(req, res) {
        const email = req.userTokenDetails.email_id;
        const verificationToken = req.body.verification_token;
        try {
            let user = await ConsultantRegistrationModel.findOneAndUpdate({
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
        const confirm_password = req.body.confirm_password;
        const current_password = req.body.current_password;
        const userDetails = req.userTokenDetails;
        try {

            const getUser: any = await ConsultantRegistrationModel.findOne({ email: userDetails.email_id });
            await Utils.passwordCheckForLogin({ simplePassword: current_password, encryptPassword: getUser.password });
            const newPasswordEncrypted = await Utils.passwordHash(confirm_password);

            await ConsultantRegistrationModel.updateOne({ email: userDetails.email_id }, { password: newPasswordEncrypted }, { new: true });
            res.status(200).json({ 'status': 200, 'message': 'Password Update Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async sendResetPasswordEmail(req, res) {
        try {
            const email = req.body.email;
            const verification_token = Utils.generateVerificatioToken();
            const verification_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;

            let user: any = await ConsultantRegistrationModel.findOneAndUpdate({ email: email }, { reset_password_token: verification_token, reset_password_token_time: verification_token_time });
            if (user) {
                // user.email
                await blueMailer.sendEmail({
                    to: user.email,
                    subject: 'Reset Your Password',
                    html: await MailTemplate.sendForgotPasswordTemplate({
                        mailfor: 'consultant',
                        token: verification_token,
                        email: email,
                    }),
                })
                res.json({ sucess: true, message: 'We have send password reset link On Registered Mail Id. Please Check.!!' });
            } else {
                req.errorStatus = 202;
                throw new Error('User Does Not Exits');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async resetPassword(req, res: any) {
        try {
            const confirm_password = req.body.confirm_password;
            const userDetails = req.user;

            const newPasswordEncrypted = await Utils.passwordHash(confirm_password);
            let user: any = await ConsultantRegistrationModel.findOneAndUpdate({ _id: userDetails._id }, {
                updated_at: new Date(),
                password: newPasswordEncrypted
            }, { new: true });
            if (user) {
                res.json({ status: 200, message: 'Password Reset Successfully' });
            } else {
                req.errorStatus = 202;
                throw new Error('User Does Not Exits');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async addNoteForClient(req, res) {
        try {

            const CountRecord = await NotesModel.find({ sessionId: req.body.sessionId, consultantId: req.userTokenDetails.user_id }).count();
            if (CountRecord > 0) {

                await NotesModel.updateOne({ sessionId: req.body.sessionId, consultantId: req.userTokenDetails.user_id }, {
                    consultantId: req.userTokenDetails.user_id,
                    clientId: req.body.clientId,
                    sessionId: req.body.sessionId,
                    description: req.body.description,
                });

                res.json({ 'status': true, 'message': 'Notes Update Successfully' });

            } else {

                await NotesModel.create({
                    consultantId: req.userTokenDetails.user_id,
                    clientId: req.body.clientId,
                    sessionId: req.body.sessionId,
                    description: req.body.description,
                });

                res.json({ 'status': 200, 'message': 'Details Add Successfully!' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSingleNote(req, res) {
        try {
            const CountRecord = await NotesModel.findOne({ sessionId: req.query.sessionId, consultantId: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) });
            if (CountRecord) {
                res.json({ 'status': true, 'data': CountRecord });
            } else {
                res.json({ 'status': true, 'data': [], 'message': 'not Found Record' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getAllNoteForClient(req, res) {
        try {
            const CountRecord = await NotesModel.find({ consultantId: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) }).count();
            let getAllRecord;
            if (CountRecord > 0) {
                getAllRecord = await NotesModel.aggregate([
                    { $match: { consultantId: new mongoose.Types.ObjectId(req.userTokenDetails.user_id) } },
                    {
                        $lookup: {
                            from: "clientregistrations",
                            localField: "clientId",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "ClientName",
                        },
                    },
                    {
                        $lookup: {
                            from: "bookingmodels",
                            localField: "sessionId",
                            foreignField: "_id",
                            pipeline: [{ $project: { amount: 1, fees: 1, book_date: 1, book_time: 1 } }],
                            as: "BookingDetails",
                        },
                    },
                ]);
                res.json({ 'status': true, 'data': getAllRecord });
            } else {
                res.json({ 'status': false, 'data': [] });
            }
        }
        catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }


}

