import PrivacyPolicyModel from "../model/Admin/PrivacyPolicyModel";

export class PrivacyPolicyController {
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
            const getTotalRecord = await PrivacyPolicyModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await PrivacyPolicyModel.find({ deleted_at: null, $text: { $search: `${search_title}`, $caseSensitive: true } }).sort({ '_id': -1 }).skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllRecord = await PrivacyPolicyModel.find({ deleted_at: null }).sort({ '_id': -1 }).skip((perPage * page) - perPage).limit(perPage);
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

            await PrivacyPolicyModel.create({ content: req.body.content })
            res.json({ 'status': 200, 'message': 'Record Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        const id = req.query.id;
        try {
            const updatedPost = await PrivacyPolicyModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDelete(req, res) {
        const Id = req.query.id;
        try {
            await PrivacyPolicyModel.updateOne({ _id: Id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreRecord(req, res) {
        const Id = req.body.id;
        try {
            await PrivacyPolicyModel.updateOne({ _id: Id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelte(req, res) {
        let str: string = req.query.id;
        let arr: Array<string> = str.split(",");
        try {
            await PrivacyPolicyModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDataWIthTrash(req, res) {
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
            const getTotalRecord = await PrivacyPolicyModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await PrivacyPolicyModel.find({ deleted_at: { $ne: null }, $text: { $search: `${search_title}`, $caseSensitive: true } }).skip((perPage * page) - perPage).limit(perPage);
            }
            else { getAllRecord = await PrivacyPolicyModel.find({ deleted_at: { $ne: null } }).skip((perPage * page) - perPage).limit(perPage); }

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
        try {
            const Id = req.body.id;
            const active_policy = req.body.active_policy;
            await PrivacyPolicyModel.updateMany({}, { $set: { active_policy: 0 } });
            await PrivacyPolicyModel.updateOne({ _id: Id }, { active_policy: active_policy });
            res.json({ 'status': 200, 'message': 'Record Udpate Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}