import { body, query } from "express-validator";
import NationalityModel from "../model/NationalityModel";

export class NationalityValidators {
    static storeService() {
        return [
            body('name', 'name is Required').isString().custom((name) => {
                return NationalityModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Nationality Already Exist');
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
                return NationalityModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Nationality Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
        ]
    }

    static deleteService() {
        return [query('id').custom((id, { req }) => {
            return NationalityModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Nationality Does Not Exist');
                }
            })
        })]
    }

    static tempDeleteService() {
        return [query('id').custom((id, { req }) => {
            return NationalityModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Nationality temp Does Not Exist');
                }
            })
        })]
    }

    static restoreService() {
        return [body('id').custom((id, { req }) => {
            return NationalityModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Nationality Does Not Exist');
                }
            })
        })]
    }

    static activeService() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}