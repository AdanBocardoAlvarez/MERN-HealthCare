import { body, query } from "express-validator";
import PrivacyPolicyModel from "../model/Admin/PrivacyPolicyModel";

export class PrivacyPolicyValidator {

    static store() {
        return [body('content', 'author name is Required').notEmpty().isString()]
    }

    static delete() {
        return [
            query('id').custom((id, { req }) => {
                return PrivacyPolicyModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((data) => {
                    if (data) { return true; } else { throw new Error('Privacy Policy Not Exist'); }
                })
            })
        ]
    }

    static tempDelete() {
        return [query('id').custom((id, { req }) => {
            return PrivacyPolicyModel.findOne({ '_id': id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('privacy policay Does Not Existd');
                }
            })
        })]
    }

    static restoreRecord() {
        return [body('id').custom((id, { req }) => {

            return PrivacyPolicyModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('Privacy Policy Not Exist');
                }
            })
        })]
    }

    static activeRecord() {
        return [body('active_policy', 'Something is worng').isNumeric()]
    }

}