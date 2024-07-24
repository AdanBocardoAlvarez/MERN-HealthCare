import DisordersModel from "../model/DisordersModel";

export class DisordersController {

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

            const serviceCount = await DisordersModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await DisordersModel.find({ deleted_at: null })
                    .skip((perPage * page) - perPage).limit(perPage);
            }
            else {
                getAllService = await DisordersModel.find({ deleted_at: null, name: { $regex: search_title, $options: 'i' } })
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

    static async storeService(req, res) {
        try {
            await DisordersModel.create({ name: req.body.name, created_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Add Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        try {
            const id = req.query.id;
            const updatedPost = await DisordersModel.findOne({ _id: id });
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
            await DisordersModel.updateOne({ _id: data_id }, {
                name: titleName,
                updated_at: new Date()
            });

            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDataWithTrash(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const show = parseInt(req.query.show) || 10000;
            const search_title = req.query.search_title;

            const perPage = show;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;

            const serviceCount = await DisordersModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('Record Not found');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await DisordersModel.find({ deleted_at: { $ne: null } })
                    .skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllService = await DisordersModel.find({ deleted_at: { $ne: null }, name: { $regex: search_title, $options: 'i' } })
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
            await DisordersModel.updateOne({ _id: req.query.id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreService(req, res) {
        try {
            await DisordersModel.updateOne({ _id: req.body.id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Successfully Restore' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async deleteService(req, res) {
        try {
            await DisordersModel.findByIdAndDelete({ _id: req.query.id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelteService(req, res) {
        let str = req.query.id;
        let arr: Array<string> = str.split(",");
        try {
            await DisordersModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Temporary Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelteService(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await DisordersModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async activeService(req, res) {
        try {
            await DisordersModel.updateOne({ _id: req.body.id }, { status: req.body.status });
            res.json({ 'status': 200, 'message': 'Record Successfully Update' });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}