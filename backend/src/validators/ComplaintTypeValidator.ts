import { body, query } from "express-validator";
import ComplaintTypeModel from "../model/ComplaintTypeModel";

export class ComplaintTypeValidators {

    static storeService() {
        return [
            body('name', 'name is Required').isString().custom((name) => {
                return ComplaintTypeModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Complaint Type Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
        ]
    }

    static editService() {
        return [
            body('name', 'name is Required').isAlphanumeric().custom((name) => {
                return ComplaintTypeModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Complaint Type Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
        ]
    }

    static deleteService() {
        return [query('id').custom((id, { req }) => {
            return ComplaintTypeModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Complaint Type Does Not Exist');
                }
            })
        })]
    }

    static tempDeleteService() {
        return [query('id').custom((id, { req }) => {
            return ComplaintTypeModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Complaint Type temp Does Not Exist');
                }
            })
        })]
    }

    static restoreService() {
        return [body('id').custom((id, { req }) => {
            return ComplaintTypeModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Complaint Type Does Not Exist');
                }
            })
        })]
    }

    static activeService() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}