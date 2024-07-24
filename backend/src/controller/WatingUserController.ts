import ContactUsModel from "../model/ContactUsModel";
import SaveClientModel from "../model/SaveClientModel";

export class WatingUserController {
    static async index(req, res) {
        try {

            const page = parseInt(req.query.page) || 1;
            const show = parseInt(req.query.show) || 10000;
            const search_title = parseInt(req.query.search_title) || null;

            const perPage = show;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages: any;
            let getAllRecord: any;


            const getTotalRecord = await SaveClientModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await SaveClientModel.find({ deleted_at: null, $text: { $search: `${search_title}`, $caseSensitive: true } }).sort({ '_id': -1 }).skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllRecord = await SaveClientModel.find({ deleted_at: null }).sort({ '_id': -1 }).skip((perPage * page) - perPage).limit(perPage);
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

    static async contactUs(req, res) {
        try {

            const page = parseInt(req.query.page) || 1;
            const show = parseInt(req.query.show) || 10000;

            const perPage = show;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages: any;

            const getTotalRecord = await ContactUsModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllRecord: any = await ContactUsModel.find({ deleted_at: null }).sort({ 'created_at': -1 }).skip((perPage * page) - perPage).limit(perPage);

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
}