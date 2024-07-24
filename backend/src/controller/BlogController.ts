import mongoose from "mongoose";
import BlogModel from "../model/BlogModel";
import KeywordModel from "../model/KeywordModel";
import DisordersModel from "../model/DisordersModel";
import ObjectivesModel from "../model/ObjectivesModel";
import AdminModel from "../model/Admin/AdminModel";
import ConsultantRegistrationModel from "../model/Consultant/Registration/ConsultantRegistrationModel";

export class BlogController {
    static async index(req, res) {

        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10000;
        const search_title = parseInt(req.query.search_title) || null;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
        let getAllRecord;

        try {
            // const  smsRespone = await Utils.sendSMS(918000979661,'hello sms')
            const getTotalRecord = await BlogModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await BlogModel.aggregate([
                    { $match: { deleted_at: null, $text: { $search: `${search_title}`, $caseSensitive: true } } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                ]).skip((perPage * page) - perPage).limit(perPage);


            } else {
                getAllRecord = await BlogModel.aggregate([
                    { $match: { deleted_at: null } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                ]).skip((perPage * page) - perPage).limit(perPage);

            }

            res.json({
                data: getAllRecord,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async store(req, res) {
        try {

            var b_img = '/uploads/blog_image/default.png';
            if (req?.files[0]?.filename) {
                b_img = '/uploads/blog_image/' + req?.files[0]?.filename;
            }

            await BlogModel.create({
                title: req.body.title,
                author_name: req.body.author_name,
                des: req.body.des,
                keywords: req.body.keywords?.split(','),
                disorder: req.body.disorder?.split(','),
                objective: req.body.objective?.split(','),
                image: b_img,
            });

            res.json({ 'status': 200, 'message': 'Record Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDisorders(req, res) {
        try {

            const Keyword = await KeywordModel.find({ status: 1 }, { name: 1 });
            const Disorders = await DisordersModel.find({ status: 1 }, { name: 1 });
            const Objectives = await ObjectivesModel.find({ status: 1 }, { name: 1 });
            res.json({ 'status': 200, 'Keyword': Keyword, 'Disorders': Disorders, 'Objectives': Objectives });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }


    static async getAuthor(req, res) {
        try {

            const Consultant = await ConsultantRegistrationModel.find({ verified_status: 1, active_status: 1 }, { name: "$given_name" });
            const admin = await AdminModel.find({}, { name: 1 });

            const authors = [...Consultant, ...admin]
            if (authors) {
                res.json({ 'status': 200, 'data': authors });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }


    static async getRecordById(req, res) {
        const id = req.query.id;
        try {
            const updatedPost = await BlogModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async edit(req, res) {
        try {
            const id = req.body.id;


            type IupDate = {
                title: string,
                author_name: string,
                des: string,
                keywords: string[],
                disorder: string[],
                objective: string[],
                updated_at: Date,
                image?: string,
            }

            let toUpdate: IupDate = {
                title: req.body.title,
                author_name: req.body.author_name,
                des: req.body.des,
                keywords: req.body.keywords?.split(','),
                disorder: req.body.disorder?.split(','),
                objective: req.body.objective?.split(','),
                updated_at: new Date()
            }

            if (req?.files[0]?.filename) {
                toUpdate.image = '/uploads/blog_image/' + req?.files[0]?.filename;
            }

            await BlogModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, toUpdate);
            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDelete(req, res) {
        const Id = req.query.id;
        try {
            await BlogModel.updateOne({ _id: Id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreRecord(req, res) {
        try {
            const Id = req.body.id;
            await BlogModel.updateOne({ _id: Id }, { deleted_at: null });
            res.json({ 'status': true, 'message': 'Record Restore Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelte(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await BlogModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': true, 'message': 'Record Successfully Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelte(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await BlogModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': true, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async delete(req, res) {
        try {
            await BlogModel.findOneAndDelete({ _id: req.query.id });
            res.json({ 'status': true, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDataWIthTrash(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const show = parseInt(req.query.show) || 10000;
            const search_title = parseInt(req.query.search_title) || null;

            const perPage = show;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;

            let getAllRecord;

            const getTotalRecord = await BlogModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await BlogModel.aggregate([
                    { $match: { deleted_at: { $ne: null }, $text: { $search: `${search_title}`, $caseSensitive: true } } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                ]).skip((perPage * page) - perPage).limit(perPage);

            }
            else {
                getAllRecord = await BlogModel.aggregate([
                    { $match: { deleted_at: { $ne: null } } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                ]).skip((perPage * page) - perPage).limit(perPage);
            }

            res.json({
                data: getAllRecord,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async activeRecord(req, res) {
        try {
            const Id = req.body.id;
            const status = req.body.status;
            await BlogModel.updateOne({ _id: Id }, { status: status });
            res.json({ 'status': 200, 'message': 'Record Udpate Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}