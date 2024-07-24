import { body } from "express-validator";
import ConsultantRegistrationModel from "../../../model/Consultant/Registration/ConsultantRegistrationModel";
import OtpValidationModel from "../../../model/OtpValidationModel";

export class ConsultantRegistrationValidations {

    static Registrationstore() {
        return [
            body('title', 'Please Select title ').notEmpty().isString(),
            body('family_name', 'Please enter family name / surname').notEmpty().isString(),
            body('given_name', 'Please enter your name').notEmpty().isString(),
            body('gender', 'Please select your gender').notEmpty().isString(),
            body('DOB', 'Please select your date of birth').notEmpty().isString(),
            body('timezone', 'Please select timezone.').notEmpty().isString(),
            body('email', 'Please enter your email id').notEmpty().isEmail().custom((email, { req }) => {
                return ConsultantRegistrationModel.findOne({ email: email }).then(user => {
                    if (!user) {
                        req.user = user;
                        return true;
                    } else {
                        throw new Error('Email ID already registered!');
                    }
                })
            }),
            body('contact_number', 'Please enter your contact number').notEmpty().isNumeric().custom((contact_number, { req }) => {
                return ConsultantRegistrationModel.findOne({ contact_number: contact_number }).then(user => {
                    if (!user?.contact_number) {
                        return true;
                    } else { throw new Error('Mobile Number Already Exits'); }
                })
            }),
            body('contact_number_isd', 'Please select your  isd code').notEmpty().isString(),
            body('contact_number_whatapp', 'Please select your whatsapp no').notEmpty().isString(),
            body('preferred_type', 'Preferred type of contact: Email/Telephone: For all information/important only/no SMS notification').isString(),
            body('password', 'Please enter your password').notEmpty().isString(),
            body('confirm_password', 'Please enter your confirm password').notEmpty().isString().custom((confirm_password, { req }) => {
                if (req.body.confirm_password == req.body.password) { return true; }
                else { throw new Error('new password & confirm password not match'); }
            }),
            body('mobile_otp', 'Please enter mobile OTP code.').notEmpty().isNumeric().custom((otp, { req }) => {
                return OtpValidationModel.findOne({ mobileOrEmail: req.body.contact_number, otp: otp })
                    .then(data => {
                        if (data) {
                            return true;
                        } else {
                            throw new Error('Invalid Mobile OTP Code.');
                        }
                    })
            }),
            body('email_otp', 'Please enter email OTP code.').notEmpty().isNumeric().custom((otp, { req }) => {
                return OtpValidationModel.findOne({ mobileOrEmail: req.body.email, otp: otp })
                    .then(data => {
                        if (data) {
                            return true;
                        } else {
                            throw new Error('Invalid Email OTP Code.');
                        }
                    })
            }),
        ]
    }

    static RegistrationBasicDetailStore() {
        return [

            body('title', 'Please Select title ').notEmpty().isString(),
            body('family_name', 'Please enter family name / surname').notEmpty().isString(),
            body('given_name', 'Please enter your name').notEmpty().isString(),
            body('gender', 'Please select your gender').notEmpty().isString(),
            body('DOB', 'Please select your date of birth').notEmpty().isString(),
            body('timezone', 'Please select timezone.').notEmpty().isString(),

            body('Correspondence_language', 'Please select your language').isString(),
            body('spoken_language', 'Please select your spoken Language').isString(),
            body('profession', 'Please select your profession').isString(),
            body('country_of_birth', 'Please select your country of birth').isString(),
            body('nationality', 'Please select your nationality').isString(),
            body('id_number', 'Please enter your id number').isString(),
            body('year_of_experience', 'Please enter your exprience').isString(),
            body('criminal_record', 'Please select criminal record option').isString(),
        ]
    }

    static RegistrationBankDetailStore() {
        return [
            body('payment_currency', 'Please select your payment currency typed').isString(),
            body('tax_information', 'Please enter tax information').isString(),
            body('country', 'Please enter your country').isString(),
            body('bank_name', 'Please enter your bank name').isString(),
            body('agency_address', 'Please enter your agency address').isString(),
            body('swift_code', 'Please enter swift code').isString(),
            body('account_number', 'Please enter account number').isString(),
            body('branch_code', 'Please enter branch code').isString(),
        ]
    }


    static RegistrationEducationDetailStore() {
        return [
            // body('gra_degree_name', 'Please enter your degree name').notEmpty().isString(),
            // body('gra_school_name', 'Please enter school name').notEmpty().isString(),
            // body('gra_year_of_graduation', 'Please enter your graduaction year').notEmpty().isString(),
            // body('gra_country', 'Please select country').notEmpty().isString(),
            // body('gra_num_of_degree', 'Please enter number of degree').optional().isString(),

            // body('post_degree_name', 'Please enter degree name').optional().isString(),
            // body('post_school_name', 'Please enter collage name').optional().isString(),
            // body('post_year_of_graduation', 'Please enter your post graduaction year').optional().isString(),
            // body('post_country', 'Please select country').optional().isString(),
            // body('post_num_of_degree', 'Please enter number of degree').optional().isString(),

            // body('gra_degree_attachment', 'Please select any degree attachtment').optional(),
            // body('post_degree_attachment', 'Please select post  degree attachtment').optional(),

            body('edu_specialization', 'Please select specialization').notEmpty().isString(),
            body('edu_disorders', 'Please select disorders').notEmpty().isString(),
            body('edu_resume', 'Please upload resume').optional(),
        ]
    }


    static RegistrationAddressDetail() {
        return [
            body('house_number', 'Please enter your house number').notEmpty().isString(),
            body('street_name', 'Please enter your street name').notEmpty().isString(),
            body('postal_code', 'Please enter postal code').notEmpty().isString(),
            body('city', 'Please select city').notEmpty().isString(),
            body('country_of_residence', 'Please select residance country').notEmpty().isString(),
        ]
    }

    static login() {
        return [
            body('email', 'Please enter valid email id').isEmail().custom((email, { req }) => {
                return ConsultantRegistrationModel.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    } else {
                        throw new Error('Email id Does Not Exits');
                    }
                })
            }),
            body('password', 'Please enter password').isString()
        ]
    }

    static changePassword() {
        return [
            body('new_password', 'Please enter new password').isString(),
            body('current_password', 'Please enter current password').isString(),
            body('confirm_password', 'Please enter confirm password').isString().custom((confirm_password, { req }) => {
                if (req.body.confirm_password == req.body.new_password) { return true; }
                else { throw new Error('new password & confirm password not match'); }
            })
        ]
    }

    static sendResetPasswordEmail() {
        return [
            body('email', 'Please enter email').isEmail().custom((email, { req }) => {
                return ConsultantRegistrationModel.findOne({ email: email }).then(user => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('Email is not registered with us');
                    }
                })
            })
        ]
    }

    static resetPassword() {
        return [
            body('email', 'please enter email').isEmail().custom((email, { req }) => {
                return ConsultantRegistrationModel.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user
                        return true;
                    } else {
                        throw new Error('Email id Does Not Exits');
                    }
                })
            }),
            body('reset_password_token', 'please enter OTP').isNumeric().custom((reset_password_token, { req }) => {
                return ConsultantRegistrationModel.findOne({
                    reset_password_token: reset_password_token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then((user) => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('Token Doest Not Exist.Please Request For a New One');
                    }
                })
            }),
            body('new_password', 'enter current password').isString(),
            body('confirm_password', 'please enter confirm password').isString().custom((confirm_password, { req }) => {
                if (req.body.confirm_password == req.body.new_password) { return true; }
                else { throw new Error('new password & confirm password not match'); }
            })
        ]
    }

    static setUpProfileAndKeywordsDetails() {
        return [
            body('profile_img', 'Please select image').optional(),
            body('bio', 'Describe your self').optional().isString(),
            body('professionalCounseling', 'Enter Professional Counseling').optional().isString(),
            body('intro_vedio', 'Please enter valid introducation vedio').optional().isString(),
            body('keywords', 'Please select at least 4 keywords').isString(),
            body('Objectives', 'Please select at least 4 objectives').isString(),
        ]
    }
}