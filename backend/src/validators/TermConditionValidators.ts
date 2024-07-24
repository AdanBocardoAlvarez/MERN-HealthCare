import { body, query } from "express-validator";
import TermConditionModel from "../model/Admin/TermConditionModel";

export class TermConditionValidator {

    static store() {
        return [body('content', 'content is Required').notEmpty().isString()]
    }

    static delete() {
        return [
            query('id').custom((id, { req }) => {
                return TermConditionModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((data) => {
                    if (data) { return true; } else { throw new Error('Term Condition Not Exist'); }
                })
            })
        ]
    }

    static tempDelete() {
        return [query('id').custom((id, { req }) => {
            return TermConditionModel.findOne({ '_id': id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('Term Condition Does Not Existd');
                }
            })
        })]
    }

    static restoreRecord() {
        return [body('id').custom((id, { req }) => {

            return TermConditionModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('Term Condition Not Exist');
                }
            })
        })]
    }

    static activeRecord() {
        return [body('active_tc', 'Something is worng').isNumeric()]
    }
}