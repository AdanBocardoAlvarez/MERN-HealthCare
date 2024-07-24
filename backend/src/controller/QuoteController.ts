import QuoteModel from "../model/QuoteModel";
import AdminModel from "../model/Admin/AdminModel";
import ConsultantRegistrationModel from "../model/Consultant/Registration/ConsultantRegistrationModel";

export class QuoteController {
    static async index(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 25;
        const search_title = parseInt(req.query.search_title) || null;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
        let getAllRecord;

        try {
            const getTotalRecord = await QuoteModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await QuoteModel.find({ deleted_at: null, $text: { $search: `${search_title}`, $caseSensitive: true } }).skip((perPage * page) - perPage).limit(perPage);
            }
            else { getAllRecord = await QuoteModel.find({ deleted_at: null }).skip((perPage * page) - perPage).limit(perPage); }

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
            await QuoteModel.create({ quote_title: req.body.quote_title, author_name: req.body.author_name })
            res.json({ 'status': 200, 'message': 'Record Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getAuthor(req, res) {
        try {
            const Consultant = await ConsultantRegistrationModel.find({}, { name: "$given_name" });
            const admin = await AdminModel.find({}, { name: 1 });

            const authors = [...Consultant, ...admin]
            if (authors) {
                res.json({ 'status': 200, 'data': authors });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        const id = req.query.id;
        try {
            const updatedPost = await QuoteModel.findOne({ _id: id });
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
        const data_id = req.body.id;
        try {
            await QuoteModel.updateOne({ _id: data_id }, {
                quote_title: req.body.quote_title,
                author_name: req.body.author_name,
                updated_at: new Date()
            });

            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDelete(req, res) {
        const Id = req.query.id;
        try {
            await QuoteModel.updateOne({ _id: Id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreRecord(req, res) {
        const Id = req.body.id;
        try {
            await QuoteModel.updateOne({ _id: Id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Restore Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelte(req, res) {
        let str: string = req.query.id;
        let arr: Array<string> = str.split(",");
        try {
            await QuoteModel.updateMany({ '_id': { '$in': arr } },
                { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelte(req, res) {

        let str: string = req.query.id;
        let arr: Array<string> = str.split(",");
        try {
            await QuoteModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async delete(req, res) {
        const Id = req.query.id;
        try {
            await QuoteModel.findOneAndDelete({ _id: Id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDataWIthTrash(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 25;
        const search_title = parseInt(req.query.search_title) || null;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        let getAllRecord;

        try {
            const getTotalRecord = await QuoteModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await QuoteModel.find({ deleted_at: { $ne: null }, $text: { $search: `${search_title}`, $caseSensitive: true } }).skip((perPage * page) - perPage).limit(perPage);
            }
            else { getAllRecord = await QuoteModel.find({ deleted_at: { $ne: null } }).skip((perPage * page) - perPage).limit(perPage); }

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

    static async activeRecord(req, res) {
        const Id = req.body.id;
        const status = req.body.status;
        try {
            await QuoteModel.updateOne({ _id: Id }, { status: status });
            res.json({ 'status': 200, 'message': 'Record Udpate Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}