import WebSettingModel from "../../model/Admin/WebSettingModel";

export class WebSettingController {

    static async storeService(req, res) {
        try {

            var updatedPost = await WebSettingModel.findOne();
            updatedPost = updatedPost.toObject({ getters: false });

            let web_logo = updatedPost.web_logo;
            let footer_logo = updatedPost.footer_logo;
            let email_logo = updatedPost.email_logo;
            let fab_icon = updatedPost.fab_icon;

            if (req.files?.web_logo?.[0]?.filename) web_logo = '/uploads/web_logo/' + req.files.web_logo[0].filename;
            if (req.files?.footer_logo?.[0]?.filename) footer_logo = '/uploads/web_logo/' + req.files.footer_logo[0].filename;
            if (req.files?.email_logo?.[0]?.filename) email_logo = '/uploads/web_logo/' + req.files.email_logo[0].filename;
            if (req.files?.fab_icon?.[0]?.filename) fab_icon = '/uploads/web_logo/' + req.files.fab_icon[0].filename;

            await WebSettingModel.deleteMany({});

            const record = await WebSettingModel.create({
                web_title: req.body.web_title,
                domain_name_without_extension: req.body.domain_name_without_extension,
                web_logo: web_logo,
                footer_logo: footer_logo,
                email_logo: email_logo,
                fab_icon: fab_icon,
                web_fb: req.body.web_fb,
                web_tw: req.body.web_tw,
                web_yt: req.body.web_yt,
                web_insta: req.body.web_insta,
                web_linkedin: req.body.web_linkedin,
                web_legal_name: req.body.web_legal_name,
                web_created_at: new Date(),
                web_updated_at: new Date()
            });

            res.json({ 'status': 200, 'message': 'Record Updated Successfully', data: record.toObject({ getters: true }) }); //
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        try {
            const record = await WebSettingModel.findOne();
            if (record) {
                res.json({ 'status': 200, 'data': record.toObject({ getters: true }) });
            } else {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async deleteService(req, res) {
        try {
            await WebSettingModel.findByIdAndDelete({ "_id": req.body.id });
            res.json({ 'status': 200, 'message': 'Record Permanently Deleted' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

}