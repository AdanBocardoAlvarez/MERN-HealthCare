import { body, query } from "express-validator";
import DigitalProductModel from "../model/DigitalProductModel";

export class DigitalProductValidator {

    static store() {
        return [
            body('title', ' title is Required').isString().custom((title) => {
                return DigitalProductModel.findOne({ title: title }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This  title already exist');
                    } else {
                        return true;
                    }
                })
            }),
            body('subtitletitle', 'title is Required').isString(),
            body('author_name', 'please select author name').isString(),
            body('des', 'description is Require').isString(),
            body('date', 'Please Select Date').isDate(),
        ]
    }

    static edit() {
        return [
            body('title', ' title is Required').isString().custom((title, { req }) => {
                return DigitalProductModel.findOne({ title: title, _id: { $ne: req.body._id } }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This  title already exist.');
                    } else {
                        return true;
                    }
                })
            }),
            body('subtitletitle', 'title is Required').isString(),
            body('author_name', 'please select author name').isString(),
            body('des', 'description is Require').isString(),
            body('date', 'Please Select Date').isDate(),
        ]
    }

    static delete() {
        return [query('id').custom((id, { req }) => {
            return DigitalProductModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('Title Does Not Exist');
                }
            })
        })]
    }

    static tempDelete() {
        return [query('id').custom((id, { req }) => {
            return DigitalProductModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('Title temp Does Not Exist');
                }
            })
        })]
    }

    static restoreRecord() {
        return [body('id').custom((id, { req }) => {

            return DigitalProductModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('Title Does Not Exist');
                }
            })
        })]
    }

    static activeRecord() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}