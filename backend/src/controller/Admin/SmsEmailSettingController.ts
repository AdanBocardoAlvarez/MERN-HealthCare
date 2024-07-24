import SmsEmailSettingModel from "../../model/Admin/SmsEmailSettingModel";

export class SmsEmailSettingController {

    static async getAllService(req, res) {

        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10;
        const search_title = req.query.search_title;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {

            const serviceCount = await SmsEmailSettingModel.find().count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await SmsEmailSettingModel.find()
                    .skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllService = await SmsEmailSettingModel.find({ $or: [{ title: { $regex: search_title, $options: 'i' } }, { subject_for_mail: { $regex: search_title, $options: 'i' } }] })
                    .skip((perPage * page) - perPage).limit(perPage);
            }

            res.json({
                post: getAllService,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
    static async editService(req, res) {
        try {

            await SmsEmailSettingModel.updateOne({ _id: req.body.id }, {
                type: req.body.type,
                subject: req.body.subject,
                mail_title: req.body.mail_title,
                mail_description: req.body.mail_description,
                sms_tmpid: req.body.sms_tmpid,
                sms_content: req.body.sms_content,
                updated_at: new Date()
            });

            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        const id = req.query?.id;
        try {

            const updatedPost = await SmsEmailSettingModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async storeService(req, res) {
        try {
            await SmsEmailSettingModel.create({
                type: req.body.type,
                subject: req.body.subject,
                mail_title: req.body.mail_title,
                mail_description: req.body.mail_description,
                sms_tmpid: req.body.sms_tmpid,
                sms_content: req.body.sms_content,
            });

            res.json({ 'status': 200, 'message': 'Record Add Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async delete(req, res) {
        try {
            const id = req.query.id;
            await SmsEmailSettingModel.findOneAndDelete({ _id: id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSmsService(req, res) {
        try {

            const page = parseInt(req.query.page) || 1;
            const show = parseInt(req.query.show) || 10;
            const search_title = req.query.search_title;

            const perPage = show;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;

            const serviceCount = await SmsEmailSettingModel.find({ type: '1' }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await SmsEmailSettingModel.find({ type: '1' })
                    .skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllService = await SmsEmailSettingModel.find({ type: '1', $or: [{ sms_tmpid: { $regex: search_title, $options: 'i' } }] })
                    .skip((perPage * page) - perPage).limit(perPage);
            }

            res.json({
                post: getAllService,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}