import TermConditionModel from "../model/Admin/TermConditionModel";

export class TermAndConditionController {
    static async index(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 50;
        const search_title = parseInt(req.query.search_title) || null;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
        let getAllRecord;

        try {
            const getTotalRecord = await TermConditionModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await TermConditionModel.find({ deleted_at: null, $text: { $search: `${search_title}`, $caseSensitive: true } }).sort({ '_id': -1 }).skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllRecord = await TermConditionModel.find({ deleted_at: null }).sort({ '_id': -1 }).skip((perPage * page) - perPage).limit(perPage);
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
            await TermConditionModel.create({ content: req.body.content });
            res.json({ 'status': 200, 'message': 'Record Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        const id = req.query.id;
        try {
            const updatedPost = await TermConditionModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDelete(req, res) {
        const Id = req.query.id;
        try {
            await TermConditionModel.updateOne({ _id: Id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreRecord(req, res) {
        const Id = req.body.id;
        try {
            await TermConditionModel.updateOne({ _id: Id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelte(req, res) {
        let str: string = req.query.id;
        let arr: Array<string> = str.split(",");
        try {
            await TermConditionModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
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
            const getTotalRecord = await TermConditionModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await TermConditionModel.find({ deleted_at: { $ne: null }, $text: { $search: `${search_title}`, $caseSensitive: true } }).skip((perPage * page) - perPage).limit(perPage);
            }
            else { getAllRecord = await TermConditionModel.find({ deleted_at: { $ne: null } }).skip((perPage * page) - perPage).limit(perPage); }

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
        const Id = req.body.id;
        const active_tc = req.body.active_tc;
        try {
            await TermConditionModel.updateMany({}, { $set: { active_tc: 0 } });
            await TermConditionModel.updateOne({ _id: Id }, { active_tc: active_tc });
            res.json({ 'status': 200, 'message': 'Record Udpate Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}