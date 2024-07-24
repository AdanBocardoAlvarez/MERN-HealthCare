import { body, query } from "express-validator";
import ComplaintModel from "../model/ComplaintModel";

export class ComplaintValidator {

    static store() {
        return [
            body('raised_against', 'raised against is required').notEmpty().isString(),
            body('type', 'Please provide type.').notEmpty().isString(),
            body('complaint_type', 'Complaint type is required').notEmpty().isString(),
            body('additional_details', 'only additional details').optional().isString().trim(),
        ]
    }

    static edit() {
        return [
            body('status', 'Status is required').isString(),
            body('action_type', 'Action type is required').isString(),
            body('decision_favour', 'favar is required ').isString(),
            body('des', 'complaint description is required').isString(),
        ]
    }

    static delete() {
        return [query('id').custom((id, { req }) => {
            return ComplaintModel.findOne({ _id: id, deleted_at: false }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('complaint Does Not Exist');
                }
            })
        })]
    }

    static tempDelete() {
        return [query('id').custom((id, { req }) => {
            return ComplaintModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('complaint temp Does Not Exist');
                }
            })
        })]
    }

    static restoreRecord() {
        return [body('id').custom((id, { req }) => {

            return ComplaintModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('complaint Does Not Exist');
                }
            })
        })]
    }

    static activeRecord() {
        return [body('status', 'Something is worng').isNumeric()]
    }

}