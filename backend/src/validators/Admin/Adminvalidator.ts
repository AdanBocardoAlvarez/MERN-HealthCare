import { body } from 'express-validator';
import AdminModel from '../../model/Admin/AdminModel';

export class AdminValidater {

    static signUp() {
        return [
            body('email', 'email id is Required').isEmail().custom((email) => {
                return AdminModel.findOne({ email: email }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('Email id already Exits');
                    } else {
                        return true;
                    }
                })
            }),
            body('password', 'Password is Required').isString()
                .isLength({ min: 8, max: 20 }).withMessage('Password can be from 8-20 Characters only'),
            body('username', 'Username is Required').isString(),
        ]
    }


    static login() {
        return [
            body('email', 'please enter email id').isEmail().custom((email, { req }) => {
                return AdminModel.findOne({ email: email }).then(user => {
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


    static updatePassword() {
        return [
            body('current_password', 'enter current password').isString(),
            body('new_password', 'please enter new password').isString(),
            body('confirm_password', 'please enter confirm password').isString().custom((confirm_password, { req }) => {

                if (req.body.confirm_password == req.body.new_password) { return true; }
                else { throw new Error('new password & confirm password not match'); }
            })
        ]
    }


    static sendForgotPasswordEmail() {
        return [body('email', 'Please enter email').isEmail().custom((email, { req }) => {
            return AdminModel.findOne({ email: email }).then(user => {
                if (user) {
                    return true;
                } else {
                    throw new Error('Email id Does Not Exits');
                }
            })
        })
        ]
    }

    static ResetPassword() {
        return [body('reset_password_token', 'Reset Password Token is Required')
            .isNumeric().custom((reset_password_token, { req }) => {
                return AdminModel.findOne({
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
        body('email', 'please enter password').isEmail().custom((email, { req }) => {
            return AdminModel.findOne({ email: email }).then(user => {
                if (user) {
                    req.user = user
                    return true;
                } else {
                    throw new Error('Email id Does Not Exits');
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
}