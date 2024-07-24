import { body, query } from "express-validator";
import CountyModel from "../model/CountryModel";

export class CountryValidator {

    static storeService() {
        return [
            body('name', 'name is Required').isString().custom((name) => {
                return CountyModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Country Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
            body('isdcode', 'country isd code is Required').isString().custom((isdcode) => {
                return CountyModel.findOne({ isdcode: isdcode }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This isd code Already Exist');
                    } else {
                        return true;
                    }
                })
            })

        ]
    }

    static editService() {
        return [
            body('name', 'name is Required').isAlphanumeric().custom((name) => {
                return CountyModel.findOne({ name: name }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This Country Already Exist');
                    } else {
                        return true;
                    }
                })
            }),
            body('isdcode', 'country isd code is Required').isString().custom((isdcode) => {
                return CountyModel.findOne({ isdcode: isdcode }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This isd code Already Exist');
                    } else {
                        return true;
                    }
                })
            })
        ]
    }

    static deleteService() {
        return [query('id').custom((id, { req }) => {
            return CountyModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Country Does Not Exist');
                }
            })
        })]
    }

    static tempDeleteService() {
        return [query('id').custom((id, { req }) => {
            return CountyModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Country temp Does Not Exist');
                }
            })
        })]
    }

    static restoreService() {
        return [body('id').custom((id, { req }) => {
            return CountyModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('Country Does Not Exist');
                }
            })
        })]
    }

    static activeService() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}