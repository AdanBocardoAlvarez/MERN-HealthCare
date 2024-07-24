import CountryModel from "../model/CountryModel";

interface ICountry {
    name: string;
    isdcode: string;
    updated_at: Date;
    country_flag?: string; // Make the property optional
}


export class CountryController {

    static async getAllService(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const show = parseInt(req.query.show) || 10000;
            const search_title = req.query.search_title;

            const perPage = show;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;

            const serviceCount = await CountryModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await CountryModel.find({ deleted_at: null }).skip((perPage * page) - perPage).limit(perPage);
            } else {
                getAllService = await CountryModel.find({ deleted_at: null, name: { $regex: search_title, $options: 'i' } })
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

            if (req.file && req.file.filename) {
                await CountryModel.create({
                    name: req.body.name,
                    isdcode: req.body.isdcode,
                    country_flag: '/uploads/country_flag_image/' + req.file.filename,
                    created_at: new Date()
                });

                res.json({ 'status': 200, 'message': 'Record Add Successfully' });
            } else {
                return res.json({ 'status': false, 'message': "Please provide country flag image." });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        try {
            const id = req.query.id;

            const updatedPost = await CountryModel.findOne({ _id: id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost.toObject({ getters: true }) });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async editService(req, res) {
        try {
            const _id = req.body.id;
            const name = req.body.name;
            const isdcode = req.body.isdcode;
            const country_flag = req.file?.filename;

            let vData: ICountry = { name, isdcode, updated_at: new Date() }
            if (country_flag) {
                vData.country_flag = '/uploads/country_flag_image/' + country_flag;
            }

            const updatedPost = await CountryModel.findOneAndUpdate({ _id }, vData);

            if (updatedPost) {
                res.json({ 'status': 200, 'message': 'Record Update Successfullydd' });
            } else {
                throw new Error('Country Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
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

            const serviceCount = await CountryModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            if (!search_title) {
                getAllService = await CountryModel.find({ deleted_at: { $ne: null } })
                    .skip((perPage * page) - perPage).limit(perPage);
            }
            else {
                getAllService = await CountryModel.find({ deleted_at: { $ne: null }, name: { $regex: search_title, $options: 'i' } })
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

    static async tempDeleteService(req, res) {
        try {
            await CountryModel.updateOne({ _id: req.query.id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreService(req, res) {
        try {
            await CountryModel.updateOne({ _id: req.body.id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Successfully Restore' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async deleteService(req, res) {
        try {
            await CountryModel.findByIdAndDelete({ _id: req.query.id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelteService(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await CountryModel.updateMany({ '_id': { '$in': arr } },
                { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Temporary Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelteService(req, res) {
        try {
            let str: string = req.body.id;
            let arr: Array<string> = str.split(",");
            await CountryModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async activeService(req, res) {
        try {
            await CountryModel.updateOne({ _id: req.body.id }, { status: req.body.status });
            res.json({ 'status': 200, 'message': 'Record Successfully Update' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}