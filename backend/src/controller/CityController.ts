import CityModel from "../model/CityModel";

export class CityController {

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

            const serviceCount = await CityModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            let skip = (perPage * page) - perPage;
            let limit = perPage;

            if (!search_title) {

                getAllService = await CityModel.aggregate([
                    { $match: { deleted_at: null } },
                    {
                        $lookup: {
                            from: "countries",
                            localField: "countryId",
                            foreignField: "_id",
                            pipeline: [
                                { $project: { name: 1 } },
                            ],
                            as: "country",
                        },
                    },
                    { $set: { country: { $arrayElemAt: ["$country.name", 0] } } },
                    { $match: { country: { $ne: null } } },
                    { "$limit": skip + limit },
                    { "$skip": skip }
                ]);


            } else {
                getAllService = await CityModel.aggregate([
                    { $match: { deleted_at: null, name: { $regex: search_title, $options: 'i' } } },
                    {
                        $lookup: {
                            from: "countries",
                            localField: "countryId",
                            foreignField: "_id",
                            pipeline: [{ $project: { name: 1 } }],
                            as: "country",
                        },
                    },
                    { $set: { country: { $arrayElemAt: ["$country.name", 0] } } },
                    { $match: { country: { $ne: null } } },
                    { "$limit": skip + limit },
                    { "$skip": skip }
                ]);
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
            const name = req.body.name;
            const countryId = req.body.countryId;
            await CityModel.create({ name, countryId, created_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Add Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getRecordById(req, res) {
        try {
            const updatedPost = await CityModel.findOne({ _id: req.query.id });
            if (updatedPost) {
                res.json({ 'status': 200, 'data': updatedPost });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async editService(req, res) {
        try {
            const _id = req.body._id;
            const name = req.body.name;
            const countryId = req.body.countryId;
            console.log(_id, { name, countryId, updated_at: new Date() });

            await CityModel.updateOne({ _id }, { name, countryId, updated_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
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

            const serviceCount = await CityModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) {
                throw Error('No More Record');
            }

            let getAllService;
            let skip = (perPage * page) - perPage;
            let limit = perPage;
            if (!search_title) {
                getAllService = await CityModel.find({ deleted_at: { $ne: null } })
                    .skip((perPage * page) - perPage).limit(perPage);

                getAllService = await CityModel.aggregate([
                    { $match: { deleted_at: { $ne: null } } },
                    {
                        $lookup: {
                            from: "countries",
                            localField: "countryId",
                            foreignField: "_id",
                            pipeline: [{ $project: { name: 1 } }],
                            as: "country",
                        },
                    },
                    { $set: { country: { $arrayElemAt: ["$country.name", 0] } } },
                    { $match: { country: { $ne: null } } },
                    { "$limit": skip + limit },
                    { "$skip": skip }
                ]);
            }
            else {
                getAllService = await CityModel.find({ name: { $regex: search_title, $options: 'i' } })
                    .skip((perPage * page) - perPage).limit(perPage);

                getAllService = await CityModel.aggregate([
                    { $match: { deleted_at: { $ne: null }, name: { $regex: search_title, $options: 'i' } } },
                    {
                        $lookup: {
                            from: "countries",
                            localField: "countryId",
                            foreignField: "_id",
                            pipeline: [{ $project: { name: 1 } }],
                            as: "country",
                        },
                    },
                    { $set: { country: { $arrayElemAt: ["$country.name", 0] } } },
                    { $match: { country: { $ne: null } } },
                    { "$limit": skip + limit },
                    { "$skip": skip }
                ]);
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
            await CityModel.updateOne({ _id: req.query.id }, { deleted_at: new Date() });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreService(req, res) {
        try {
            await CityModel.updateOne({ _id: req.body.id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Successfully Restore' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async deleteService(req, res) {
        try {
            await CityModel.findByIdAndDelete({ _id: req.query.id });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelteService(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await CityModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Temporary Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelteService(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await CityModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async activeService(req, res) {
        try {
            await CityModel.updateOne({ _id: req.body.id }, { status: req.body.status });
            res.json({ 'status': 200, 'message': 'Record Successfully Update' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}