import { body, query } from "express-validator";
import BlogModel from "../model/BlogModel";

export class BlogValidator {

    static store() {
        return [

            body('title', 'blog title is Required').isString().custom((title) => {
                return BlogModel.findOne({ title: title }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This blog title already exist');
                    } else {
                        return true;
                    }
                })
            }),
            body('des', 'description is Require').isString(),
            body('author_name', 'description is Required ').isString(),
            body('keywords', 'select keywords is Require').optional().isString(),
            body('disorder', 'description is Required ').optional().isString(),
            body('objective', 'description is Require').optional().isString(),

        ]
    }

    static edit() {
        return [
            body('title', 'blog title is Required').isString().custom((title) => {
                return BlogModel.findOne({ title: title }).then(serviceName => {
                    if (serviceName) {
                        throw new Error('This blog title already exist');
                    } else {
                        return true;
                    }
                })
            }),
            body('des', 'description is Require').isString(),
            body('author_name', 'description is Required ').isString(),
        ]
    }

    static delete() {
        return [query('id').custom((id, { req }) => {
            return BlogModel.findOne({ _id: id, deleted_at: { $ne: null } }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('blog Does Not Exist');
                }
            })
        })]
    }

    static tempDelete() {
        return [query('id').custom((id, { req }) => {
            return BlogModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('blog temp Does Not Exist');
                }
            })
        })]
    }

    static restoreRecord() {
        return [body('id').custom((id, { req }) => {

            return BlogModel.findOne({ _id: id }).then((data) => {
                if (data) {
                    return true;
                } else {
                    throw new Error('blog Does Not Exist');
                }
            })
        })]
    }

    static activeRecord() {
        return [body('status', 'Something is worng').isNumeric()]
    }

}