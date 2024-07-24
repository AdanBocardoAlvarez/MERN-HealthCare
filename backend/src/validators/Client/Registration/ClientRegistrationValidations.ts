import { body, query } from "express-validator";
import ClientRegistrationModel from "../../../model/Client/Registration/ClientRegistrationModel";
import OtpValidationModel from "../../../model/OtpValidationModel";

export class ClientRegistrationValidations {

    static Registrationstore() {
        return [
            body('title', 'Please Select title ').notEmpty().isString(),
            body('family_name', 'Please enter family name / surname').notEmpty().isString(),
            body('given_name', 'Please enter your name').notEmpty().isString(),
            body('gender', 'Please select your gender').notEmpty().isString(),
            body('DOB', 'Please select your date of birth').notEmpty().isString(),
            body('timezone', 'Please select timezone.').notEmpty().isString(),
            body('email', 'Please enter your email id').notEmpty().isEmail().custom((email, { req }) => {
                return ClientRegistrationModel.findOne({ email: email }).then(user => {
                    if (!user) {
                        req.user = user;
                        return true;
                    } else {
                        throw new Error('Email ID already registered!');
                    }
                })
            }),
            body('contact_number', 'Please enter your contact number').notEmpty().isNumeric().custom((contact_number, { req }) => {
                return ClientRegistrationModel.findOne({ contact_number: contact_number }).then(user => {
                    if (!user?.contact_number) {
                        return true;
                    } else { throw new Error('Mobile Number Already Exits'); }
                })
            }),
            body('contact_number_isd', 'Please select your  isd code').notEmpty().isString(),
            body('preferred_type', 'Preferred type of contact: Email/Telephone: For all information/important only/no SMS notification').isString(),
            body('password', 'Please enter your password').notEmpty().isString(),
            body('confirm_password', 'Please enter your confirm password').notEmpty().isString().custom((confirm_password, { req }) => {
                if (req.body.confirm_password == req.body.password) { return true; }
                else { throw new Error('new password & confirm password not match'); }
            }),
            body('accept_tc_pp', 'Please accept term&condition and privacy police').notEmpty().isBoolean(),
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


    static contactUs() {
        return [
            body('name', 'Please enter your name.').notEmpty().isString().isLength({ min: 5, max: 100 }),
            body('email', 'Please enter your email id.').notEmpty().isEmail().isString().isLength({ min: 5, max: 100 }),
            body('phone', 'Please enter your contact number').notEmpty().isNumeric().optional({ nullable: true, checkFalsy: true }),
            body('organization', 'Please enter your organization / Company.').notEmpty().isString().optional({ nullable: true, checkFalsy: true }),
            body('subject', 'Please enter subject.').notEmpty().isString().isLength({ min: 5, max: 100 }),
            body('message', 'Please enter your message').notEmpty().isString().isLength({ min: 5, max: 500 }),
            body('accept_tc', 'Please accept term & condition.').notEmpty().isBoolean(),
        ]
    }

    static RegistrationEdit() {
        return [
            body('title', 'Please Select title ').notEmpty().isString(),
            body('family_name', 'Please enter family name / surname').notEmpty().isString(),
            body('given_name', 'Please enter your name').notEmpty().isString(),
            body('gender', 'Please select your gender').notEmpty().isString(),
            body('DOB', 'Please select your date of birth').notEmpty().isString(),
            body('contact_number_isd', 'Please select your  isd code').notEmpty().isString(),
            body('preferred_type', 'Preferred type of contact: Email/Telephone: For all information/important only / no SMS notification').isString(),
            body('password', 'Please enter your password').notEmpty().isString(),
        ]
    }

    static BasicDetailStore() {
        return [
            body('Correspondence_language', 'Please select your language').isString(),
            body('profession', 'Please select your profession').isString(),
            body('country_of_birth', 'Please select your country of birth').isString(),
            body('nationality', 'Please select your nationality').isString(),

            body('house_number', 'Please enter your house number').notEmpty().isString(),
            body('street_name', 'Please enter your street name').notEmpty().isString(),
            body('postal_code', 'Please enter postal code').notEmpty().isString(),
            body('timezone', 'Please select Timezone').notEmpty().isString(),
            body('currency_used', 'Please select currency').notEmpty().isString(),
        ]
    }


    static BookingDetails() {
        return [
            body('consultant_bookid', 'Please enter consultant id').notEmpty().isString(),
            body('amount', 'Please enter total amount').notEmpty().isString(),
            body('fees', 'Please enter consultant fees').notEmpty().isString(),
            body('book_date', 'Please enter booking date').notEmpty().isString(),
            body('book_time', 'Please enter booking time').notEmpty().isString(),
        ]
    }


    static login() {
        return [
            body('email', 'Please enter valid email id').isEmail().custom((email, { req }) => {
                return ClientRegistrationModel.findOne({ email: email }).then(user => {
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
        return [body('email', 'Please enter email').isEmail().custom((email, { req }) => {
            return ClientRegistrationModel.findOne({ email: email }).then(user => {
                if (user) {
                    return true;
                } else {
                    throw new Error('Email is not registered with us');
                }
            })
        })
        ]
    }

    static verifyResetPasswordToken() {
        return [query('reset_password_token', 'Reset Password Token is Required')
            .isNumeric().custom((reset_password_token, { req }) => {
                return ClientRegistrationModel.findOne({
                    reset_password_token: reset_password_token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then((user) => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('Token Doest Not Exist.Please Request For a New One');
                    }
                })
            })]
    }

    static resetPassword() {
        return [
            body('email', 'please enter email').isEmail().custom((email, { req }) => {
                return ClientRegistrationModel.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user
                        return true;
                    } else {
                        throw new Error('Email id Does Not Exits');
                    }
                })
            }),
            body('reset_password_token', 'please enter OTP').isNumeric().custom((reset_password_token, { req }) => {
                return ClientRegistrationModel.findOne({
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
            body('new_password', 'enter new password').isString(),
            body('confirm_password', 'please enter confirm password').isString().custom((confirm_password, { req }) => {
                if (req.body.confirm_password == req.body.new_password) { return true; }
                else { throw new Error('new password & confirm password not match'); }
            })
        ]
    }


}