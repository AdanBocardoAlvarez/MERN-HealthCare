import { body, query } from "express-validator";
import QuoteModel from "../model/QuoteModel";

export class QuoteValidator {

    static store() {
        return [
            body('quote_title', 'quote title is Required').notEmpty().isString().custom((quote_title) => {
                return QuoteModel.findOne({ quote_title: quote_title }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This quote title already exist');
                    } else {
                        return true;
                    }
                })
            }),
            body('author_name', 'author name is Required').notEmpty().isString(),
        ]
    }

    static delete() {
        return [query('id').custom((id, { req }) => {
            return QuoteModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('quote Does Not Exist');
                }
            })
        })]
    }

    static tempDelete() {
        return [query('id').custom((id, { req }) => {
            return QuoteModel.findOne({ '_id': id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('quote temp Does Not Existd');
                }
            })
        })]
    }

    static restoreRecord() {
        return [body('id').custom((id, { req }) => {

            return QuoteModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('quote Does Not Exist');
                }
            })
        })]
    }

    static activeRecord() {
        return [body('status', 'Something is worng').isNumeric()]
    }

}