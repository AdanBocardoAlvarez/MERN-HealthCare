import ObjectivesModel from "../model/ObjectivesModel";

export class ObjectivesController {

    static async getAllService(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10000;
        const search_title = req.query.search_title;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {

            const serviceCount = await ObjectivesModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await ObjectivesModel.find({ deleted_at: null })
                    .skip((perPage * page) - perPage).limit(perPage);
            }
            else {
                getAllService = await ObjectivesModel.find({ deleted_at: null, name: { $regex: search_title, $options: 'i' } })
                    .skip((perPage * page) - perPage).limit(perPage);
            }

            res.json({
                data: getAllService,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async storeService(req, res) {
        try {
            await ObjectivesModel.create({ name: req.body.name, created_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Add Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        const id = req.query.id;
        try {

            const updatedPost = await ObjectivesModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost.name });
            } else {
                res.json({ 'status': 200, 'message': 'Record Not found' });
            }
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async editService(req, res) {
        const titleName = req.body.name;
        const data_id = req.body.id;
        try {
            await ObjectivesModel.updateOne({ _id: data_id }, {
                name: titleName,
                updated_at: new Date()
            });

            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDataWithTrash(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10000;
        const search_title = req.query.search_title;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {
            const serviceCount = await ObjectivesModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('Record Not found');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await ObjectivesModel.find({ deleted_at: { $ne: null } })
                    .skip((perPage * page) - perPage).limit(perPage);
            }
            else {
                getAllService = await ObjectivesModel.find({ deleted_at: { $ne: null }, name: { $regex: search_title, $options: 'i' } })
                    .skip((perPage * page) - perPage).limit(perPage);
            }

            res.json({
                data: getAllService,
                pageToken: pageToken,
                totalPages: totalPages,
                currentPage: currentPage,
                prevPage: prevPage
            });

        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDeleteService(req, res) {
        try {
            await ObjectivesModel.updateOne({ _id: req.query.id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreService(req, res) {
        try {
            await ObjectivesModel.updateOne({ _id: req.body.id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Successfully Restore' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async deleteService(req, res) {
        try {
            await ObjectivesModel.findByIdAndDelete({ _id: req.query.id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelteService(req, res) {
        let str = req.query.id;
        let arr: Array<string> = str.split(",");
        try {
            await ObjectivesModel.updateMany({ '_id': { '$in': arr } },
                { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Temporary Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelteService(req, res) {
        let str: string = req.query.id;
        let arr: Array<string> = str.split(",");

        try {
            await ObjectivesModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async activeService(req, res) {
        try {
            await ObjectivesModel.updateOne({ _id: req.body.id }, { status: req.body.status });
            res.json({ 'status': 200, 'message': 'Record Successfully Update' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}