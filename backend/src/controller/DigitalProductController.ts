import DigitalProductModel from "../model/DigitalProductModel";
import AdminModel from "../model/Admin/AdminModel";
import ConsultantRegistrationModel from "../model/Consultant/Registration/ConsultantRegistrationModel";

export class DigitalProductController {
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
            const getTotalRecord = await DigitalProductModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {

                getAllRecord = await DigitalProductModel.aggregate([
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
                ])

            } else {
                //  getAllRecord = await DigitalProductModel.find({deleted_at:null}).skip((perPage*page)-perPage).limit(perPage); 
                getAllRecord = await DigitalProductModel.aggregate([
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

                ]).skip((perPage * page) - perPage).limit(perPage)
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

    static async store(req, res) {
        try {
            let pdf = null, image = null;

            if (req.files?.pdf?.[0]?.filename) pdf = '/uploads/digital_product/' + req.files.pdf[0].filename
            if (req.files?.image?.[0]?.filename) image = '/uploads/digital_product/' + req.files.image[0].filename

            await DigitalProductModel.create({
                title: req.body.title,
                subtitletitle: req.body.subtitletitle,
                author_name: req.body.author_name,
                des: req.body.des,
                date: req.body.date,
                pdf,
                image,
            });

            res.json({ 'status': 200, 'message': 'Record Successfully' });
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
            const updatedPost = await DigitalProductModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async edit(req, res) {
        try {

            const id = req.body._id;

            let oldData = await DigitalProductModel.findById(id);
            if (!oldData) return res.json({ 'status': false, 'message': 'This Record Not Found' });

            type IVData = {
                title: string,
                subtitletitle: string,
                author_name: string,
                des: string,
                date: string,
                pdf?: string,
                image?: string,
            }

            let vData: IVData = {
                title: req.body.title,
                subtitletitle: req.body.subtitletitle,
                author_name: req.body.author_name,
                des: req.body.des,
                date: req.body.date,
            }

            if (req.files?.pdf?.[0]?.filename) vData.pdf = '/uploads/digital_product/' + req.files?.pdf?.[0]?.filename
            if (req.files?.image?.[0]?.filename) vData.image = '/uploads/digital_product/' + req.files?.image?.[0]?.filename;

            await DigitalProductModel.updateOne({ _id: id }, { ...vData, updated_at: new Date() });
            return res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDelete(req, res) {
        try {
            const Id = req.query.id;
            await DigitalProductModel.updateOne({ _id: Id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreRecord(req, res) {
        try {
            await DigitalProductModel.updateOne({ _id: req.body.id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelte(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await DigitalProductModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelte(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await DigitalProductModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async delete(req, res) {
        try {
            const Id = req.query.id;
            await DigitalProductModel.findOneAndDelete({ _id: Id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
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

            const getTotalRecord = await DigitalProductModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {

                getAllRecord = await DigitalProductModel.aggregate([
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
                getAllRecord = await DigitalProductModel.aggregate([
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
            await DigitalProductModel.updateOne({ _id: Id }, { status: status });
            res.json({ 'status': 200, 'message': 'Record Udpate Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}