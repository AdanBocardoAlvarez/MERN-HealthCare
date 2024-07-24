import { body, query } from "express-validator";
import DisordersModel from "../model/DisordersModel";

export class DisordersValidators {

    static storeService() {
        return [
            body('name', 'name is Required').isString().custom((name) => {
                return DisordersModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Disorders Already Exist');
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
                return DisordersModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Disorders Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
        ]
    }

    static deleteService() {
        return [query('id').custom((id, { req }) => {
            return DisordersModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Disorders Does Not Exist');
                }
            })
        })]
    }

    static tempDeleteService() {
        return [query('id').custom((id, { req }) => {
            return DisordersModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Disorders temp Does Not Exist');
                }
            })
        })]
    }

    static restoreService() {
        return [body('id').custom((id, { req }) => {
            return DisordersModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Disorders Does Not Exist');
                }
            })
        })]
    }

    static activeService() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}