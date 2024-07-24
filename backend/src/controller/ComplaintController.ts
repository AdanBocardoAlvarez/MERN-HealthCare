import mongoose from "mongoose";
import ComplaintModel from "../model/ComplaintModel";
import ConsultantRegistrationModel from "../model/Consultant/Registration/ConsultantRegistrationModel";
import { blueMailer } from "../utils/blueMailer";
import { MailTemplate } from "../utils/MailTemplate";
import ClientRegistrationModel from "../model/Client/Registration/ClientRegistrationModel";

export class ComplaintController {

    static async index(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 100000;
        const search_title = parseInt(req.query.search_title) || null;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;
        let getAllRecord;
        try {
            const getTotalRecord = await ComplaintModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await ComplaintModel.aggregate([
                    { $match: { deleted_at: null, $text: { $search: `${search_title}`, $caseSensitive: true } } },
                    {
                        $lookup: {
                            from: "clientregistrations",
                            localField: "raised_by",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "raisedByClientName",
                        },
                    },
                    {
                        $lookup: {
                            from: "clientregistrations",
                            localField: "raised_against",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "againstClientName",
                        },
                    },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "raised_by",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "raisedByConsultantName",
                        },
                    },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "raised_against",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "againstConsultantName",
                        },
                    },
                    {
                        $lookup: {
                            from: "complainttypes",
                            localField: "complaint_type",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 0, name: 1 } }],
                            as: "complaintType",
                        },
                    },
                    {
                        $project: {
                            action_type: 1, status: 1, decision_favour: 1, attachment: 1, desc: 1, additional_details: 1, created_at: 1,
                            complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                            raisedByClientName: { $arrayElemAt: ["$raisedByClientName.given_name", 0] },
                            againstClientName: { $arrayElemAt: ["$againstClientName.given_name", 0] },
                            raisedByConsultantName: { $arrayElemAt: ["$raisedByConsultantName.given_name", 0] },
                            againstConsultantName: { $arrayElemAt: ["$againstConsultantName.given_name", 0] },
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage);
            }
            else {
                getAllRecord = await ComplaintModel.aggregate([
                    { $match: { deleted_at: null } },
                    {
                        $lookup: {
                            from: "clientregistrations",
                            localField: "raised_by",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "raisedByClientName",
                        },
                    },
                    {
                        $lookup: {
                            from: "clientregistrations",
                            localField: "raised_against",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "againstClientName",
                        },
                    },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "raised_by",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "raisedByConsultantName",
                        },
                    },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "raised_against",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                            as: "againstConsultantName",
                        },
                    },
                    {
                        $lookup: {
                            from: "complainttypes",
                            localField: "complaint_type",
                            foreignField: "_id",
                            pipeline: [{ $project: { _id: 0, name: 1 } }],
                            as: "complaintType",
                        },
                    },
                    {
                        $project: {
                            action_type: 1, status: 1, decision_favour: 1, attachment: 1, desc: 1, additional_details: 1, created_at: 1,
                            complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                            raisedByClientName: { $arrayElemAt: ["$raisedByClientName.given_name", 0] },
                            againstClientName: { $arrayElemAt: ["$againstClientName.given_name", 0] },
                            raisedByConsultantName: { $arrayElemAt: ["$raisedByConsultantName.given_name", 0] },
                            againstConsultantName: { $arrayElemAt: ["$againstConsultantName.given_name", 0] },
                        }
                    }

                ]).skip((perPage * page) - perPage).limit(perPage);
                //.find({deleted_at:null})
            }

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

    static async getClientRecordById(req, res) {
        try {
            const get = await ComplaintModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.query.id) } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                        as: "raisedByClientName",
                    },
                },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                        as: "againstClientName",
                    },
                },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                        as: "raisedByConsultantName",
                    },
                },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 1, given_name: 1 } }],
                        as: "againstConsultantName",
                    },
                },
                {
                    $lookup: {
                        from: "complainttypes",
                        localField: "complaint_type",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, name: 1 } }],
                        as: "complaintType",
                    },
                },
                {
                    $project: {
                        action_type: 1, status: 1, decision_favour: 1, attachment: 1, desc: 1, additional_details: 1, created_at: 1,
                        complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                        raisedByClientName: { $arrayElemAt: ["$raisedByClientName.given_name", 0] },
                        againstClientName: { $arrayElemAt: ["$againstClientName.given_name", 0] },
                        raisedByConsultantName: { $arrayElemAt: ["$raisedByConsultantName.given_name", 0] },
                        againstConsultantName: { $arrayElemAt: ["$againstConsultantName.given_name", 0] },
                    }
                }
            ]);

            if (get.length > 0) {
                res.json({ 'status': 200, 'data': get[0] });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantRecordById(req, res) {
        try {

            const get = await ComplaintModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.query.id) } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "clientbasicdetails",
                                    localField: "_id",
                                    foreignField: "clientUserId",
                                    pipeline: [{ $project: { profile_image: 1 } }],
                                    as: "profileImage",
                                },
                            },
                            { $project: { given_name: 1, profileImg: "$profileImage.profile_image" } }
                        ],
                        as: "clientDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "consultantprofileandkeyworddetails",
                                    localField: "_id",
                                    foreignField: "consultant_profileid",
                                    pipeline: [{ $project: { profile_img: 1 } }],
                                    as: "profileImg",
                                },
                            },
                            { $project: { given_name: 1, "profileImg": "$profileImg.profile_img" } }
                        ],
                        as: "consultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "complainttypes",
                        localField: "complaint_type",
                        foreignField: "_id",
                        pipeline: [{ $project: { name: 1 } }],
                        as: "complaintType",
                    },
                },
                {
                    $project: {
                        action_type: 1, status: 1, decision_favour: 1, desc: 1, additional_details: 1, created_at: 1,
                        clientDetails: { $arrayElemAt: ["$clientDetails", 0] },
                        consultantDetails: { $arrayElemAt: ["$consultantDetails", 0] },
                        complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                    }
                },
            ]);

            if (get.length > 0) {
                res.json({ 'status': 200, 'data': get[0] });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getComplaintByClient(req, res) {
        try {
            const get = await ComplaintModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.query.id) } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "consultantprofileandkeyworddetails",
                                    localField: "_id",
                                    foreignField: "consultant_profileid",
                                    pipeline: [{ $project: { profile_img: 1 } }],
                                    as: "profileImg",
                                },
                            },
                            { $project: { given_name: 1, "profileImg": "$profileImg.profile_img" } }],
                        as: "ConsultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "clientbasicdetails",
                                    localField: "_id",
                                    foreignField: "clientUserId",
                                    pipeline: [{ $project: { profile_image: 1 } }],
                                    as: "profileImage",
                                },
                            },
                            { $project: { given_name: 1, "profileImage": "$profileImage.profile_image" } }],
                        as: "clientDetails",
                    },
                },
                {
                    $lookup: {
                        from: "complainttypes",
                        localField: "complaint_type",
                        foreignField: "_id",
                        pipeline: [{ $project: { name: 1 } }],
                        as: "complaintType",
                    },
                },
            ]);

            res.json({ 'status': true, 'data': get });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }

    }

    static async getComplaintByConsultant(req, res) {
        try {
            const get = await ComplaintModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.query.id) } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "clientbasicdetails",
                                    localField: "_id",
                                    foreignField: "clientUserId",
                                    pipeline: [{ $project: { profile_image: 1 } }],
                                    as: "profileImage",
                                },
                            },
                            { $project: { given_name: 1, profileImg: { $arrayElemAt: ["$profileImg.profile_img", 0] } } }
                        ],
                        as: "clientDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "consultantprofileandkeyworddetails",
                                    localField: "_id",
                                    foreignField: "consultant_profileid",
                                    pipeline: [{ $project: { profile_img: 1 } }],
                                    as: "profileImg",
                                },
                            },
                            { $project: { given_name: 1, profileImg: { $arrayElemAt: ["$profileImg.profile_img", 0] } } }
                        ],
                        as: "consultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "complainttypes",
                        localField: "complaint_type",
                        foreignField: "_id",
                        pipeline: [{ $project: { name: 1 } }],
                        as: "complaintType.name",
                    },
                },
            ]);

            res.json({ 'status': true, 'data': get });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async edit(req, res) {
        try {

            let UpdateData = await ComplaintModel.findOneAndUpdate({ _id: req.body.id }, {
                status: req.body.status,
                action_type: req.body.action_type,
                decision_favour: req.body.decision_favour,
                desc: req.body.desc,
                updated_at: new Date()
            }, { new: true });

            if (UpdateData) {

                const getConsultantData = await ConsultantRegistrationModel.findOne({ _id: UpdateData.raised_against }, { email: 1, given_name: 1, preferred_type: 1, contact_number_isd: 1, contact_number: 1 });
                const getClientData = await ClientRegistrationModel.findOne({ _id: UpdateData.raised_against }, { email: 1, given_name: 1, preferred_type: 1, contact_number_isd: 1, contact_number: 1 });

                if (getConsultantData && UpdateData.status == 1) {
                    const Name = getConsultantData.given_name
                    const Contant = `An abuse report has been filed against you on the VhealTHY platform. We kindly request you to review the report and take appropriate action.`

                    await blueMailer.sendEmail({
                        to: getConsultantData.email,
                        subject: 'Abuse report filed against you - VhealTHY',
                        html: await MailTemplate.webTemplate({ Name, Contant }),
                    })
                }

                if ((getConsultantData || getClientData) && UpdateData.status == 1) {
                    const ClientName = getClientData.given_name
                    const ClientContant = `An abuse report has been filed against you on the VhealTHY platform. We kindly request you to review the report and take appropriate action.`

                    await blueMailer.sendEmail({
                        to: getClientData.email,
                        subject: 'Abuse report filed against you - VhealTHY',
                        html: await MailTemplate.webTemplate({ Name: ClientName, Contant: ClientContant }),
                    })
                }

                if (getConsultantData && UpdateData.action_type === "Block") {
                    await ConsultantRegistrationModel.updateOne({ _id: UpdateData.raised_against }, { active_status: 2 });
                }

                if (getClientData && UpdateData.action_type === "Block") {
                    await ClientRegistrationModel.updateOne({ _id: UpdateData.raised_against }, { active_status: 2 });
                }

                res.json({ 'status': 200, 'message': 'Record Update Successfully' });
            } else {
                throw new Error('This Record Not Found');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempDelete(req, res) {
        try {
            const Id = req.query.id;
            const UpdateData = await ComplaintModel.findOneAndUpdate({ _id: Id }, { deleted_at: new Date() });
            if (UpdateData) { res.json({ 'status': 200, 'message': 'Record Delete Successfully' }); }
            else { throw new Error('This Record Not Found'); }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async restoreRecord(req, res) {
        try {
            await ComplaintModel.updateOne({ _id: req.body.id }, { deleted_at: null });
            res.json({ 'status': 200, 'message': 'Record Delete Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async tempMultiDelte(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await ComplaintModel.updateMany({ '_id': { '$in': arr } }, { $set: { deleted_at: new Date() } });
            res.json({ 'status': 200, 'message': 'Record Successfully Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async multiDelte(req, res) {
        try {
            let str: string = req.query.id;
            let arr: Array<string> = str.split(",");
            await ComplaintModel.deleteMany({ '_id': { $in: arr } }, { deleted_at: { $ne: null } });
            res.json({ 'status': 200, 'message': 'Record Permanently Delete' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async delete(req, res) {
        try {
            const Id = req.query.id;
            await ComplaintModel.findOneAndDelete({ _id: Id });
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
            const getTotalRecord = await ComplaintModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(getTotalRecord / perPage);
            if (totalPages === page || totalPages === 0) { pageToken = null; }

            if (page > totalPages) {
                throw Error('No More Record');
            }

            if (search_title != null) {
                getAllRecord = await ComplaintModel.find({ deleted_at: { $ne: null }, $text: { $search: `${search_title}`, $caseSensitive: true } }).skip((perPage * page) - perPage).limit(perPage);
            }
            else { getAllRecord = await ComplaintModel.find({ deleted_at: { $ne: null } }).skip((perPage * page) - perPage).limit(perPage); }

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
            const data = await ComplaintModel.findOneAndUpdate({ _id: Id }, { status: status });
            if (data) {
                await ComplaintModel.updateOne({ _id: Id }, { raised_against: 1 });
                await ConsultantRegistrationModel.updateOne({ ConsultantID: req.query.id }, { deleted_at: new Date() });

                if (req.body.status == 1) {

                    const Name = req.body.given_name
                    const Contant = `<p>An abuse report has been filed against you on the VhealTHY platform. We kindly request you to review the report and take appropriate action.</p>`
                    await blueMailer.sendEmail({
                        to: req.body.email,
                        subject: 'Abuse report filed against you - VhealTHY',
                        html: await MailTemplate.webTemplate({ Name, Contant }),
                    })
                }

                res.json({ 'status': 200, 'message': 'Record Udpate Successfully' });
            } else {
                throw Error('No More Record');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}