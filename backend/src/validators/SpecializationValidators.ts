import { body, query } from "express-validator";
import SpecializationModel from "../model/SpecializationModel";

export class SpecializationValidators {

    static storeService() {
        return [
            body('name', 'name is Required').isString().custom((name) => {
                return SpecializationModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Specialization Already Exist');
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
                return SpecializationModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Specialization Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
        ]
    }

    static deleteService() {
        return [query('id').custom((id, { req }) => {
            return SpecializationModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Specialization Does Not Exist');
                }
            })
        })]
    }

    static tempDeleteService() {
        return [query('id').custom((id, { req }) => {
            return SpecializationModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Specialization temp Does Not Exist');
                }
            })
        })]
    }

    static restoreService() {
        return [body('id').custom((id, { req }) => {
            return SpecializationModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Specialization Does Not Exist');
                }
            })
        })]
    }

    static activeService() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}