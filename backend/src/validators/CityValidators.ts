import { body, query } from "express-validator";
import CityModel from "../model/CityModel";

export class CityValidator {

    static storeService() {
        return [
            body('name', 'name is Required').notEmpty().isString(),
            body('countryId', 'Select Country Name').notEmpty()
        ]
    }

    static editService() {
        return [
            body('name', 'name is Required').notEmpty().isString(),
            body('countryId', 'Select Country Name').notEmpty()
        ]
    }

    static deleteService() {
        return [query('id').custom((id, { req }) => {
            return CityModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('City Does Not Exist');
                }
            })
        })]
    }

    static tempDeleteService() {
        return [query('id').custom((id, { req }) => {
            return CityModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('City temp Does Not Exist');
                }
            })
        })]
    }

    static restoreService() {
        return [body('id').custom((id, { req }) => {
            return CityModel.findOne({ _id: id }).then((generalService) => {
                if (generalService) {
                    return true;
                } else {
                    throw new Error('City Does Not Exist');
                }
            })
        })]
    }

    static activeService() {
        return [body('status', 'Something is worng').isNumeric()]
    }
}