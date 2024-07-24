import mongoose from "mongoose";
import CountryModel from "../model/CountryModel";
import DisordersModel from "../model/DisordersModel";
import LanguagesModel from "../model/LanguagesModel";
import NationalityModel from "../model/NationalityModel";
import SpecializationModel from "../model/SpecializationModel";
import ConsultantRegistrationModel from "../model/Consultant/Registration/ConsultantRegistrationModel";
import KeywordModel from "../model/KeywordModel";
import ObjectivesModel from "../model/ObjectivesModel";
import CityModel from "../model/CityModel";
import QuoteModel from "../model/QuoteModel";
import ComplaintModel from "../model/ComplaintModel";
import FavoriteBlogModel from "../model/Client/Registration/FavoriteBlogModel";
import AdminModel from "../model/Admin/AdminModel";
import BlogModel from "../model/BlogModel";
import ComplaintTypeModel from "../model/ComplaintTypeModel";
import ClientRegistrationModel from "../model/Client/Registration/ClientRegistrationModel";
import DigitalProductModel from "../model/DigitalProductModel";
import TermConditionModel from "../model/Admin/TermConditionModel";
import PrivacyPolicyModel from "../model/Admin/PrivacyPolicyModel";
import ConsultantModifyTimeSlotModel from "../model/Consultant/Registration/ConsultantModifyTimeSlotModel";
import moment from 'moment-timezone';
import BookingModel from "../model/Client/Registration/BookingModel";
import { Utils } from "../utils/utils";
import ContactUs from "../model/ContactUsModel";

export class ComApiController {

    static async getSearchKeys(req, res) {
        try {

            const myFiter = [{ $match: { deleted_at: null, status: 1 } }, { $project: { _id: 0, value: "$name" } }];
            const languages = await LanguagesModel.aggregate(myFiter);
            const specializations = await SpecializationModel.aggregate(myFiter);
            const disorders = await DisordersModel.aggregate(myFiter);
            const keywords = await KeywordModel.aggregate(myFiter);
            const objectives = await ObjectivesModel.aggregate(myFiter);

            const getRecord = [...new Set([...specializations, ...disorders, ...keywords, ...objectives, ...languages])];
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async contactUs(req, res) {
        try {

            const { name, email, phone = null, organization = null, subject, message } = req.body;
            await ContactUs.create({ name, email, phone, organization, subject, message })
            return res.json({ 'status': true, 'message': "Thanks for filling out our form..!! We will look over your message and get back to you soon." });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getCountry(req, res) {
        try {
            let getRecord = await CountryModel.find({ deleted_at: null, status: 1 });
            if (getRecord.length > 0) {
                res.json({ data: getRecord.map(row => row.toJSON({ getters: true })) });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getCity(req, res) {
        try {
            let getRecord = await CityModel.find({ deleted_at: null, status: 1 });
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getLanguages(req, res) {
        try {

            let getRecord = await LanguagesModel.find({ deleted_at: null, status: 1 }, 'name');
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getNationality(req, res) {
        try {
            let getRecord = await NationalityModel.find({ deleted_at: null, status: 1 }, 'name');
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSpecialization(req, res) {
        try {
            let getRecord = await SpecializationModel.find({ deleted_at: null, status: 1 }, 'name');
            if (getRecord.length > 0) {
                res.json({ status: true, data: getRecord });
            } else {
                res.json({ status: 402, data: [], message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDisorders(req, res) {
        try {
            let getRecord = await DisordersModel.find({ deleted_at: null, status: 1 }, 'name');
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getKeywords(req, res) {
        try {
            let getRecord = await KeywordModel.find({ deleted_at: null, status: 1 }, 'name');
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getObjective(req, res) {
        try {
            let getRecord = await ObjectivesModel.find({ deleted_at: null, status: 1 }, 'name');
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getNotesForClient(req, res) {
        try {
            let getRecord = await ObjectivesModel.find({ deleted_at: null, status: 1 });
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getNotesForConsulatant(req, res) {
        try {
            let getRecord = await ObjectivesModel.find({ deleted_at: null, status: 1 });
            if (getRecord.length > 0) {
                res.json({ data: getRecord });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getQuote(req, res) {
        try {
            let getRecordCount = await QuoteModel.find({ deleted_at: null, status: 1 }).count();
            if (getRecordCount > 0) {
                let getAllRecord = await QuoteModel.aggregate([
                    { $match: { deleted_at: null, status: 1 } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                ]);

                res.json({ data: getAllRecord });
            }
            else {
                res.json({ status: 402, message: 'Record Not Found' });
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getBlogs(req, res) {
        try {
            let getRecordCount = await BlogModel.find({ deleted_at: null, status: 1 }).count();
            if (getRecordCount > 0) {
                let getAllRecord = await BlogModel.aggregate([
                    { $match: { deleted_at: null, status: 1 } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                ]);
                res.json({ data: getAllRecord });
            }
            else {
                res.json({ status: 402, message: 'Record Not Found' });
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSingleBlogs(req, res) {
        try {
            let getRecordCount = await BlogModel.find({ _id: new mongoose.Types.ObjectId(req.query.blog_id), deleted_at: null, status: 1 }).count();
            if (getRecordCount > 0) {
                let getAllRecord = await BlogModel.aggregate([
                    { $match: { _id: new mongoose.Types.ObjectId(req.query.blog_id), deleted_at: null, status: 1 } },
                    {
                        $lookup: {
                            from: "consultantregistrations",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { given_name: 1 } }],
                            as: "AuthorName",
                        },
                    },
                    {
                        $lookup: {
                            from: "admins",
                            localField: "author_name",
                            foreignField: "_id",
                            pipeline: [{ $project: { name: 1 } }],
                            as: "AuthorNameSecond",
                        },
                    },

                    //  {$project:{title:1,author_name:1,des:1,image:1,keywords:1,title:1,}}
                ]);
                res.json({ data: getAllRecord });
            }
            else {
                res.json({ status: 402, message: 'Record Not Found' });
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }


    //END ====== This Api are Us both panel like Website and consultant and Client Module =======

    /* =============                                    ==================== 
       =============   THIS BLOCK USE FOR WEBSITE API   ====================
       =============                                    ==================== */

    // This api get consultant Time Slot For Website
    static async getConsultantDetails(req, res) {
        try {

            const next15Dates = ComApiController.getNext15Dates();
            let getRecord = await ConsultantRegistrationModel.aggregate([
                { $match: { "active_status": 1, "verified_status": 1 } },
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "Correspondence_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CorrespondenceLanguage",
                                },
                            },
                            // { $project: { _id: 0, spoken_language: 1, profession: 1,id_number:1,
                            //     id_number_attachment:1,year_of_experience:1,criminal_record:1,criminal_record_attachment:1,
                            //     countryOfBirth:1,CorrespondenceLanguage:1,nationality:1 } }  
                        ],
                        as: "BasicDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantfeesdetails",
                        localField: "_id",
                        foreignField: "ConsultantID",
                        pipeline: [
                            { $project: { _id: 0, fees: 1 } }
                        ],
                        as: "consultantFees",
                    },
                },
                {
                    $lookup: {
                        from: "consultanteducationdetails",
                        localField: "_id",
                        foreignField: "userEducation",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "specializations",
                                    localField: "edu_specialization",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpecializationName",
                                },
                            },
                            {
                                $lookup: {
                                    from: "disorders",
                                    localField: "edu_disorders",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "disorderName",
                                },
                            },
                            {
                                $project: {
                                    _id: 0,
                                    edu_specialization: 1, edu_disorders: 1, disorderName: 1, SpecializationName: 1
                                }
                            }
                        ],
                        as: "EducationDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultanttimeslots",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        //pipeline: [{ $project: { SlotArray: 1,_id:0} }],
                        as: "TimeSlots",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [{
                            $project: { _id: 0, profile_img: 1, }
                        }],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $project: {
                        title: 1,
                        given_name: 1,
                        gender: 1,
                        DOB: 1,
                        contact_number: 1,
                        ProfileAndKeyword: 1,
                        EducationDetails: 1,
                        "Fees": "$consultantFees.fees",
                        BasicDetails: 1,
                        contact_number_isd: 1,
                        consultantTimeSlot: {
                            $concatArrays: ["$TimeSlots.Sunday", "$TimeSlots.Monday", "$TimeSlots.Tuesday", "$TimeSlots.Wednesday", "$TimeSlots.Thursday", "$TimeSlots.Friday", "$TimeSlots.Saturday"]
                        }
                    }
                }
            ])

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            var TimeSchedule: any = [];

            for (let i = 0; i < getRecord.length; i++) {
                TimeSchedule.push({ "Userid": getRecord[i]._id, "UserSlot": [] })

                var userTimeScheduleArr = []
                for (let dateCount = 0; dateCount < next15Dates.length; dateCount++) {

                    var dateData = new Date(next15Dates[dateCount]);
                    const dayOfWeek = daysOfWeek[dateData.getDay()];
                    userTimeScheduleArr.push({ 'DateList': dateData })
                    var DayTimeScheduleArr = {}
                    for (let daysCount = 0; daysCount < getRecord[i].consultantTimeSlot.length; daysCount++) {
                        if (dayOfWeek == getRecord[i]?.consultantTimeSlot[daysCount].day) {
                            DayTimeScheduleArr = { ...DayTimeScheduleArr, ...getRecord[i]?.consultantTimeSlot[daysCount] }
                        }
                    }
                    userTimeScheduleArr[dateCount] = { ...userTimeScheduleArr[dateCount], ...DayTimeScheduleArr }
                }
                TimeSchedule[i].UserSlot = userTimeScheduleArr
            }

            for (let rCount = 0; rCount < getRecord.length; rCount++) {
                for (let cCount = 0; cCount < TimeSchedule.length; cCount++) {
                    if (TimeSchedule[cCount].Userid == getRecord[rCount]._id) {
                        // Replace original TimeSlot Formate to Custom Time Formate
                        getRecord[rCount].consultantTimeSlot = TimeSchedule[cCount].UserSlot
                    }
                }
            }

            res.json({ status: true, data: getRecord });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    //This Api Only For Test For Time Slot Not Using in any Place in whole project
    static async getConsultantTwoDetails(req, res) {
        try {

            let getRecord = await ConsultantRegistrationModel.aggregate([
                { $match: { "active_status": 1, "verified_status": 1 } },
                {
                    $lookup: {
                        from: "consultanttimeslottwos",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        as: "TimeSlots",
                    },
                },
            ])

            res.json({ data: getRecord });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    // This Is comman Function for get next 15 days date , 
    // this function use in getConsultantDetails Function
    static getNext15Dates() {

        const currentDateInGMT = Utils.myMoment();
        const next15Dates = [];
        for (let i = 0; i < 15; i++) {
            const nextDate = currentDateInGMT.clone().add(i, 'days');
            next15Dates.push(nextDate.format('YYYY-MM-DD HH:mm:ss'));
        }
        return next15Dates;
    }
    // This api get consultant Time Slot For Website

    static async getFilterDetails(req, res) {
        try {

            let page = req.query.page ? parseInt(req.query.page) : 1;
            page = page < 1 ? 1 : page;

            let limit = 10;

            const next15Dates = ComApiController.getNext15Dates();

            let condi = { "active_status": 1 };

            if (req.query.search) {
                let search = req.query.search;
                condi = {
                    ...condi, ...{
                        $or: [
                            { given_name: { $regex: search, $options: 'i' } },
                            { 'BasicDetails.profession': { $regex: search, $options: 'i' } },
                            { 'BasicDetails.Correspondence_language': { $regex: search, $options: 'i' } },
                            { 'BasicDetails.SpokenLanguage_': { $elemMatch: { name: { $regex: search, $options: 'i' } } } },
                            { 'EducationDetails.SpecializationName_': { $elemMatch: { name: { $regex: search, $options: 'i' } } } },
                            { 'EducationDetails.disorderName_': { $elemMatch: { name: { $regex: search, $options: 'i' } } } },
                            { 'ProfileAndKeyword.ObjectivesName_': { $elemMatch: { name: { $regex: search, $options: 'i' } } } },
                            { 'ProfileAndKeyword.KeywordsName_': { $elemMatch: { name: { $regex: search, $options: 'i' } } } },
                        ]
                    }
                }
            }

            if (req.query.languages && !!req.query.languages && req.query?.languages?.length > 0) {
                let arrLanguages = req.query.languages?.map(id => new mongoose.Types.ObjectId(id))
                // condi = { ...condi, ...{ 'BasicDetails.spoken_language': { $in: arrLanguages } } };
                condi = { ...condi, ...{ 'BasicDetails.Correspondence_language': { $in: arrLanguages } } };
            }

            if (req.query.specialization && !!req.query.specialization && req.query?.specialization?.length > 0) {
                let getSpecialization = req.query.specialization?.map(id => new mongoose.Types.ObjectId(id))
                condi = { ...condi, ...{ 'EducationDetails.edu_specialization': { $in: getSpecialization } } };

            }

            if (req.query.disorders && !!req.query.disorders && req.query?.disorders?.length > 0) {
                let arrDisorders = req.query.disorders?.map(id => new mongoose.Types.ObjectId(id))
                condi = { ...condi, ...{ 'EducationDetails.edu_disorders': { $in: arrDisorders } } };
            }

            if (req.query.objectives && !!req.query.objectives && req.query?.objectives?.length > 0) {
                let arrObjectives = req.query?.objectives?.map(id => new mongoose.Types.ObjectId(id))
                condi = { ...condi, ...{ 'ProfileAndKeyword.Objectives': { $in: arrObjectives } } };
            }


            if (req.body.keywords && !!req.query.keywords && req.query?.keywords?.length > 0) {
                let getkeywords = req.body.keywords?.map(id => new mongoose.Types.ObjectId(id))
                condi = { ...condi, ...{ 'ProfileAndKeyword.keywords': { $in: getkeywords } } };
            }

            const getRecord = await ConsultantRegistrationModel.aggregate([
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "Correspondence_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CorrespondenceLanguage",
                                },
                            },
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "spoken_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpokenLanguage_",
                                },
                            },
                            {
                                $set: {
                                    CorrespondenceLanguage: { $arrayElemAt: ["$CorrespondenceLanguage.name", 0] },
                                    SpokenLanguage: {
                                        $map: { input: "$SpokenLanguage_", as: "language", in: "$$language.name" }
                                    }
                                }
                            },
                            {
                                $project: { _id: 0, spoken_language: 1, Correspondence_language: 1, CorrespondenceLanguage: 1, profession: 1, criminal_record_attachment: 1, criminal_record: 1, year_of_experience: 1, id_number_attachment: 1, id_number: 1, nationality: 1, country_of_birth: 1, languages: 1, SpokenLanguage: 1, SpokenLanguage_: 1 }
                            }
                        ],
                        as: "BasicDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantfeesdetails",
                        localField: "_id",
                        foreignField: "ConsultantID",
                        pipeline: [{ $project: { _id: 0, fees: 1 } }],
                        as: "consultantFees",
                    },
                },
                {
                    $lookup: {
                        from: "consultanteducationdetails",
                        localField: "_id",
                        foreignField: "userEducation",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "specializations",
                                    localField: "edu_specialization",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpecializationName_",
                                },
                            },
                            {
                                $lookup: {
                                    from: "disorders",
                                    localField: "edu_disorders",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "disorderName_",
                                },
                            },
                            {
                                $set: {
                                    SpecializationName: { $map: { input: "$SpecializationName_", as: "row", in: "$$row.name" } },
                                    disorderName: { $map: { input: "$disorderName_", as: "row", in: "$$row.name" } },
                                }
                            },
                            {
                                $project: { _id: 0, gra_degree_name: 1, gra_school_name: 1, gra_year_of_graduation: 1, gra_country: 1, gra_num_of_degree: 1, gra_degree_attachment: 1, post_degree_name: 1, post_school_name: 1, post_year_of_graduation: 1, post_country: 1, post_num_of_degree: 1, post_degree_attachment: 1, edu_specialization: 1, edu_disorders: 1, edu_resume: 1, SpecializationName: 1, disorderName: 1, SpecializationName_: 1, disorderName_: 1 }
                            }
                        ],
                        as: "EducationDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultanttimeslots",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        pipeline: [{ $project: { _id: 0, SlotTime: 1, Sunday: 1, Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 1 } }],
                        as: "TimeSlots",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "keywords",
                                    localField: "keywords",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "KeywordsName_",
                                },
                            },
                            {
                                $lookup: {
                                    from: "objectives",
                                    localField: "Objectives",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "ObjectivesName_",
                                },
                            },
                            {
                                $set: {
                                    KeywordsName: { $map: { input: "$KeywordsName_", as: "row", in: "$$row.name" } },
                                    ObjectivesName: { $map: { input: "$ObjectivesName_", as: "row", in: "$$row.name" } },
                                }
                            },
                            { $project: { _id: 0, profile_img: 1, bio: 1, professionalCounseling: 1, intro_vedio: 1, keywords: 1, Objectives: 1, KeywordsName: 1, ObjectivesName: 1, KeywordsName_: 1, ObjectivesName_: 1 } }
                        ],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $match: { $or: [condi] }
                },
                {
                    $project: {
                        title: 1, timezone: 1, unique_code: 1, given_name: 1, gender: 1, DOB: 1, contact_number_whatapp: 1,
                        BasicDetails: 1, consultantFees: 1, EducationDetails: 1, TimeSlots: 1, ProfileAndKeyword: 1,
                        consultantTimeSlot: {
                            $concatArrays: ["$TimeSlots.Sunday", "$TimeSlots.Monday", "$TimeSlots.Tuesday", "$TimeSlots.Wednesday", "$TimeSlots.Thursday", "$TimeSlots.Friday", "$TimeSlots.Saturday"]
                        }
                    }
                },
                {
                    $set: {
                        BasicDetails: { $arrayElemAt: ["$BasicDetails", 0] },
                        consultantFees: { $arrayElemAt: ["$consultantFees.fees", 0] },
                        EducationDetails: { $arrayElemAt: ["$EducationDetails", 0] },
                        TimeSlots: { $arrayElemAt: ["$TimeSlots", 0] },
                        ProfileAndKeyword: { $arrayElemAt: ["$ProfileAndKeyword", 0] },
                    }
                },
                { $setWindowFields: { output: { totalCount: { $count: {} } } } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ]);

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var TimeSchedule: any = [];

            var totalCount = 0;

            for (let i = 0; i < getRecord.length; i++) {

                delete getRecord[i]?.BasicDetails?.SpokenLanguage_;
                delete getRecord[i]?.EducationDetails?.SpecializationName_;
                delete getRecord[i]?.EducationDetails?.disorderName_;
                delete getRecord[i]?.ProfileAndKeyword?.ObjectivesName_;
                delete getRecord[i]?.ProfileAndKeyword?.KeywordsName_;

                totalCount = getRecord[i].totalCount;
                TimeSchedule.push({ "Userid": getRecord[i]._id, "UserSlot": [] })

                var getModifyDate = await ConsultantModifyTimeSlotModel.findOne({ consultantModifyTimeId: getRecord[i]._id, Date: { $gt: new Date() } })

                if (!!getModifyDate?.Date) {
                    var convertModifyDate = moment(getModifyDate?.Date).format('YYYY-MM-DD');
                    var ModifyUserID = getModifyDate?.consultantModifyTimeId;
                }

                var userTimeScheduleArr = []
                for (let dateCount = 0; dateCount < next15Dates.length; dateCount++) {
                    // var dateData = new Date(next15Dates[dateCount]); 
                    moment.tz.setDefault('UTC');
                    // Get the current day in GMT
                    const specificDate = moment(next15Dates[dateCount]).format('YYYY-MM-DD');
                    // .format('YYYY-MM-DD HH:mm:ss');
                    const currentDayInGMT = moment(next15Dates[dateCount]).format('d');
                    const dayOfWeek = daysOfWeek[currentDayInGMT];

                    userTimeScheduleArr.push({ 'DateList': specificDate })
                    var DayTimeScheduleArr = {}

                    for (let daysCount = 0; daysCount < getRecord[i].consultantTimeSlot.length; daysCount++) {
                        if (dayOfWeek == getRecord[i]?.consultantTimeSlot[daysCount].day) {
                            // this condition for replace modify date and time 
                            if (!!convertModifyDate && specificDate === convertModifyDate && getRecord[i]._id.toString() === ModifyUserID.toString()) {
                                DayTimeScheduleArr = { ...DayTimeScheduleArr, ...getModifyDate.ModifyTimeSlot }
                            }
                            else {
                                DayTimeScheduleArr = { ...DayTimeScheduleArr, ...getRecord[i]?.consultantTimeSlot[daysCount] }
                            }
                        }
                    }
                    userTimeScheduleArr[dateCount] = { ...userTimeScheduleArr[dateCount], ...DayTimeScheduleArr }
                }
                TimeSchedule[i].UserSlot = userTimeScheduleArr

            }

            for (let rCount = 0; rCount < getRecord?.length; rCount++) {
                for (let cCount = 0; cCount < TimeSchedule?.length; cCount++) {
                    if (TimeSchedule[cCount].Userid == getRecord[rCount]._id) {
                        // Replace original TimeSlot Formate to Custom Time Formate
                        getRecord[rCount].consultantTimeSlot = TimeSchedule[cCount].UserSlot
                    }
                }
            }

            // const userRecordMerge: any = [];
            // if (!!date_from && !!time_from && !!time_end) {
            //     for (let fCount = 0; fCount < getRecord.length; fCount++) {
            //         let BlankArray = []
            //         let mergedArray = []
            //         for (let RawCount = 0; RawCount < getRecord[fCount].consultantTimeSlot.length; RawCount++) {
            //             if (getRecord[fCount].consultantTimeSlot[RawCount].DateList == date_from) {
            //                 var morningArray = getRecord[fCount].consultantTimeSlot[RawCount].morning.map(convertToint)
            //                 var afternoonArray = getRecord[fCount].consultantTimeSlot[RawCount].afternoon.map(convertToint)
            //                 var eveningArray = getRecord[fCount].consultantTimeSlot[RawCount].evening.map(convertToint)
            //                 var nightArray = getRecord[fCount].consultantTimeSlot[RawCount].night.map(convertToint)
            //                 function convertToint(str) { return parseInt(str); }

            //                 var morningCount = morningArray.filter(number => number >= time_from && number <= time_end)
            //                 var afternoonCount = afternoonArray.filter(number => number >= time_from && number <= time_end)
            //                 var eveningCount = eveningArray.filter(number => number >= time_from && number <= time_end)
            //                 var nightCount = nightArray.filter(number => number >= time_from && number <= time_end)

            //                 if (morningCount.length > 0) {
            //                     console.log("Present in Morning.");
            //                 }
            //                 if (afternoonCount.length > 0) {
            //                     console.log("Present in Afternoon Array.");
            //                 }
            //                 else if (eveningCount.length > 0) {
            //                     console.log("Present in Evening Array");
            //                 }
            //                 else if (nightCount.length > 0) {
            //                     console.log("Present in Night Array.");
            //                 }
            //             }
            //         }
            //     }
            // }

            res.json({ status: true, total: totalCount, data: getRecord });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message, total: 0 });
        }
    }

    static async getConsultantList(req, res) {
        try {
            const getRecordCount = await ConsultantRegistrationModel.find({ active_status: 1 }, { given_name: 1, _id: 1 }).count();
            if (getRecordCount === 0) {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            } else if (getRecordCount) {
                const getRecord = await ConsultantRegistrationModel.find({ active_status: 1 }, { given_name: 1, _id: 1 });
                res.json({ 'status': 200, 'data': getRecord });
            }
            else {
                res.status(500).json({ 'status': 500, 'message': 'Record Not Found' });
            }

        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static async getClientList(req, res) {
        try {
            const getRecordCount = await ClientRegistrationModel.find({ active_status: 1 }, { given_name: 1, _id: 1 }).count();
            if (getRecordCount === 0) {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            } else if (getRecordCount) {
                const getRecord = await ClientRegistrationModel.find({ active_status: 1 }, { given_name: 1, _id: 1 });
                res.json({ 'status': 200, 'data': getRecord });
            }
            else {
                res.status(500).json({ 'status': 500, 'message': 'Record Not Found' });
            }

        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static async getSingleConsultant(req, res) {
        const userId = req.query.userId;
        try {

            if (!mongoose.isValidObjectId(userId)) {
                return res.status(404).json({ status: 402, message: 'Record Not Found' });
            }

            const getAllService = await ConsultantRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country_of_birth",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "countryOfBirth",
                                },
                            },
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "Correspondence_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CorrespondenceLanguage",
                                },
                            },
                            {
                                $lookup: {
                                    from: "nationalities",
                                    localField: "nationality",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "nationality",
                                },
                            },
                            {
                                $project: {
                                    _id: 0, spoken_language: 1, profession: 1, id_number: 1,
                                    id_number_attachment: 1, year_of_experience: 1, criminal_record: 1, criminal_record_attachment: 1,
                                    countryOfBirth: 1, CorrespondenceLanguage: 1, nationality: 1
                                }
                            }
                        ],
                        as: "BasicDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantfeesdetails",
                        localField: "_id",
                        foreignField: "ConsultantID",
                        pipeline: [
                            { $project: { _id: 0, fees: 1 } }
                        ],
                        as: "consultantFees",
                    },
                },
                {
                    $lookup: {
                        from: "consultantaddressdetails",
                        localField: "_id",
                        foreignField: "consultant_address",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country_of_residence",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CountryOfResidence",
                                },
                            },
                            {
                                $lookup: {
                                    from: "cities",
                                    localField: "city",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "City",
                                },
                            },

                            {
                                $project: {
                                    _id: 0, house_number: 1, street_name: 1,
                                    street_name2: 1, postal_code: 1, CountryOfResidence: 1, City: 1
                                }
                            }
                        ],
                        as: "AddressDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantbankdetails",
                        localField: "_id",
                        foreignField: "consultant_bankUser",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CountryName",
                                },
                            },
                            {
                                $project: {
                                    _id: 0, payment_currency: 1, tax_information: 1,
                                    bank_name: 1, bank_Agency_name: 1, agency_address: 1, swift_code: 1,
                                    account_number: 1, branch_code: 1, Iban: 1, control_key: 1, account_holder_name: 1,
                                    account_currency: 1, add_bank_information: 1, country: 1, CountryName: 1
                                }
                            }
                        ],
                        as: "BankDetails",
                    },
                },
                // {
                //     $lookup: {
                //         from: "consultanteducationdetails",
                //         localField: "_id",
                //         foreignField: "userEducation",
                //         pipeline: [
                //             {
                //                 $lookup: {
                //                     from: "countries",
                //                     localField: "gra_country",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "graduate_country",
                //                 },
                //             },
                //             {
                //                 $lookup: {
                //                     from: "countries",
                //                     localField: "post_country",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "post_country",
                //                 },
                //             },
                //             {
                //                 $lookup: {
                //                     from: "specializations",
                //                     localField: "edu_specialization",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "SpecializationName",
                //                 },
                //             },
                //             {
                //                 $lookup: {
                //                     from: "disorders",
                //                     localField: "edu_disorders",
                //                     foreignField: "_id",
                //                     pipeline: [{ $project: { name: 1, _id: 0 } }],
                //                     as: "disorderName",
                //                 },
                //             },
                //             {
                //                 $project: {
                //                     _id: 0, gra_degree_name: 1, gra_school_name: 1,
                //                     gra_year_of_graduation: 1, gra_num_of_degree: 1, gra_degree_attachment: 1, post_degree_name: 1,
                //                     post_school_name: 1, post_year_of_graduation: 1, post_num_of_degree: 1, post_degree_attachment: 1,
                //                     edu_specialization: 1, edu_disorders: 1, edu_resume: 1,
                //                     graduate_country: 1, post_country: 1, disorderName: 1, SpecializationName: 1
                //                 }
                //             }
                //         ],
                //         as: "EducationDetails",
                //     },
                // },

                {
                    $lookup: {
                        from: "consultanteducationdetails",
                        localField: "_id",
                        foreignField: "userEducation",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "specializations",
                                    localField: "edu_specialization",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpecializationName",
                                },
                            },
                            {
                                $lookup: {
                                    from: "disorders",
                                    localField: "edu_disorders",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "disorderName",
                                },
                            },
                            {
                                $project: { edu_specialization: 1, edu_disorders: 1, edu_resume: 1, disorderName: 1, SpecializationName: 1 }
                            }
                        ],
                        as: "EducationDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultanteducations",
                        localField: "_id",
                        foreignField: "consultant_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "countries",
                                    localField: "country",
                                    foreignField: "_id",
                                    pipeline: [
                                        { $project: { name: 1 } },
                                    ],
                                    as: "country_name",
                                },
                            },
                            { $set: { country_name: { $arrayElemAt: ["$country_name.name", 0] } } },
                        ],
                        as: "consultantDegrees",
                    },
                },
                {
                    $lookup: {
                        from: "consultanttimeslots",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        pipeline: [
                            {
                                $project: {
                                    _id: 0, SlotTime: 1, Sunday: 1,
                                    Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1,
                                    Friday: 1, Saturday: 1
                                }
                            }
                        ],
                        as: "TimeSlot",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [{ $project: { _id: 0, profile_img: 1, bio: 1, professionalCounseling: 1, intro_vedio: 1, keywords: 1, Objectives: 1 } }],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [
                            { $unwind: "$keywords" },
                            {
                                $lookup: {
                                    from: "keywords",
                                    localField: "keywords",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { _id: 0, name: 1 } }],
                                    as: "KeyWordName",
                                },
                            },
                            { $unwind: "$KeyWordName" },
                            {
                                $group: {
                                    _id: null,
                                    keywordsName: { $push: "$KeyWordName" }
                                }
                            },
                            { $project: { _id: 0, keywordsName: "$keywordsName.name" } }
                        ],
                        as: "KeyWordNameUseByConsultant",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "objectives",
                                    localField: "Objectives",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "ObjectivesName",
                                },
                            },
                            {
                                $set: {
                                    ObjectivesName: { $map: { input: "$ObjectivesName", as: "row", in: "$$row.name" } },
                                }
                            },
                        ],
                        as: "ObjectiveUseByConsultant",
                    },
                },
                {
                    $set: {
                        ObjectiveUseByConsultant: { $map: { input: "$ObjectiveUseByConsultant", as: "row", in: "$$row.ObjectivesName" } },
                    }
                },
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
                        pipeline: [
                            { $unwind: "$spoken_language" },
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "spoken_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { _id: 0, name: 1 } }],
                                    as: "spoken_languageName",
                                },
                            },
                            { $unwind: "$spoken_languageName" },
                            {
                                $group: {
                                    _id: null,
                                    spokenLanguageName: { $push: "$spoken_languageName" }
                                }
                            },
                        ],
                        as: "SpokenLanguageName",
                    },
                },
                // { $project: {title: 1,unique_code: 1,family_name: 1,given_name: 1,gender: 1,DOB: 1,
                //     email: 1,contact_number: 1,alternative_number: 1,contact_number_isd: 1,alternative_number_isd: 1,
                //     contact_number_whatapp: 1,preferred_type: 1,verified_status: 1,active_status: 1, "Fees":"$consultantFees.fees",
                //     "BasicDetails":1,"AddressDetails":1,"BankDetails":1,"EducationDetails":1,"TimeSlot":1,
                //     "ProfileAndKeyword":1,"ObjectiveUseByConsultant": "$ObjectiveUseByConsultant.ObjectiveName","KeyWordNameUseByConsultant": "$KeyWordNameUseByConsultant.keywordsName",
                //     "SpokenLanguageName": "$SpokenLanguageName.spokenLanguageName", }}

                // {
                //     $set: {
                //         BasicDetails: { $arrayElemAt: ["$BasicDetails", 0] },
                //         consultantFees: { $arrayElemAt: ["$consultantFees", 0] },
                //         AddressDetails: { $arrayElemAt: ["$AddressDetails", 0] },
                //         BankDetails: { $arrayElemAt: ["$BankDetails", 0] },

                //         EducationDetails: { $arrayElemAt: ["$EducationDetails", 0] },
                //         ProfileAndKeyword: { $arrayElemAt: ["$ProfileAndKeyword", 0] },

                //     }
                // }

            ]);

            if (getAllService.length > 0) {
                res.json({ 'status': true, data: getAllService[0] });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }

        } catch (e) { res.json({ 'status': false, 'message': 'Something went wrong' }); }
    }

    static async getSingleConsultant2(req, res) {
        const userId = req.query.userId;
        try {

            if (!mongoose.isValidObjectId(userId)) {
                return res.status(404).json({ status: 402, message: 'Record Not Found' });
            }

            const getAllService = await ConsultantRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "Correspondence_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "CorrespondenceLanguage",
                                },
                            },
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "spoken_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpokenLanguage",
                                },
                            },
                            {
                                $set: {
                                    CorrespondenceLanguage: { $arrayElemAt: ["$CorrespondenceLanguage.name", 0] },
                                    SpokenLanguage: {
                                        $map: { input: "$SpokenLanguage", as: "language", in: "$$language.name" }
                                    }
                                }
                            },
                            {
                                $project: { _id: 0, CorrespondenceLanguage: 1, profession: 1, criminal_record_attachment: 1, criminal_record: 1, year_of_experience: 1, id_number_attachment: 1, id_number: 1, nationality: 1, country_of_birth: 1, languages: 1, SpokenLanguage: 1, SpokenLanguage_: 1 }
                            }
                        ],
                        as: "BasicDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultantfeesdetails",
                        localField: "_id",
                        foreignField: "ConsultantID",
                        pipeline: [{ $project: { _id: 0, fees: 1 } }],
                        as: "consultantFees",
                    },
                },
                {
                    $lookup: {
                        from: "consultanteducationdetails",
                        localField: "_id",
                        foreignField: "userEducation",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "specializations",
                                    localField: "edu_specialization",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "SpecializationName",
                                },
                            },
                            {
                                $lookup: {
                                    from: "disorders",
                                    localField: "edu_disorders",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "disorderName",
                                },
                            },
                            {
                                $set: {
                                    SpecializationName: { $map: { input: "$SpecializationName", as: "row", in: "$$row.name" } },
                                    disorderName: { $map: { input: "$disorderName", as: "row", in: "$$row.name" } },
                                }
                            },
                            {
                                $project: { _id: 0, gra_degree_name: 1, gra_school_name: 1, gra_year_of_graduation: 1, gra_country: 1, gra_num_of_degree: 1, gra_degree_attachment: 1, post_degree_name: 1, post_school_name: 1, post_year_of_graduation: 1, post_country: 1, post_num_of_degree: 1, post_degree_attachment: 1, edu_specialization: 1, edu_disorders: 1, edu_resume: 1, SpecializationName: 1, disorderName: 1 }
                            }
                        ],
                        as: "EducationDetails",
                    },
                },
                {
                    $lookup: {
                        from: "consultanttimeslots",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        pipeline: [{ $project: { _id: 0, SlotTime: 1, Sunday: 1, Monday: 1, Tuesday: 1, Wednesday: 1, Thursday: 1, Friday: 1, Saturday: 1 } }],
                        as: "TimeSlots",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "keywords",
                                    localField: "keywords",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "KeywordsName",
                                },
                            },
                            {
                                $lookup: {
                                    from: "objectives",
                                    localField: "Objectives",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "ObjectivesName",
                                },
                            },
                            {
                                $set: {
                                    KeywordsName: { $map: { input: "$KeywordsName", as: "row", in: "$$row.name" } },
                                    ObjectivesName: { $map: { input: "$ObjectivesName", as: "row", in: "$$row.name" } },
                                }
                            },
                            { $project: { _id: 0, profile_img: 1, bio: 1, professionalCounseling: 1, intro_vedio: 1, keywords: 1, Objectives: 1, KeywordsName: 1, ObjectivesName: 1 } }
                        ],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $project: {
                        title: 1, timezone: 1, unique_code: 1, given_name: 1, gender: 1, DOB: 1, contact_number_whatapp: 1,
                        BasicDetails: 1, consultantFees: 1, EducationDetails: 1, TimeSlots: 1, ProfileAndKeyword: 1,
                        consultantTimeSlot: {
                            $concatArrays: ["$TimeSlots.Sunday", "$TimeSlots.Monday", "$TimeSlots.Tuesday", "$TimeSlots.Wednesday", "$TimeSlots.Thursday", "$TimeSlots.Friday", "$TimeSlots.Saturday"]
                        }
                    }
                },
                {
                    $set: {
                        BasicDetails: { $arrayElemAt: ["$BasicDetails", 0] },
                        consultantFees: { $arrayElemAt: ["$consultantFees.fees", 0] },
                        EducationDetails: { $arrayElemAt: ["$EducationDetails", 0] },
                        TimeSlots: { $arrayElemAt: ["$TimeSlots", 0] },
                        ProfileAndKeyword: { $arrayElemAt: ["$ProfileAndKeyword", 0] },

                    }
                },
            ]);

            if (getAllService.length > 0) {
                res.json({ 'status': true, data: getAllService[0] });
            } else {
                res.json({ status: 402, message: 'Record Not Found' });
            }

        } catch (e) { res.json({ 'status': false, 'message': 'Something went wrong' }); }
    }

    static async getAutocompleteDetails(req, res) {
        try {

            // const searchTerm = req.query.search;
            // const Keyword = await KeywordModel.find({ name: { $regex: new RegExp(`^${searchTerm}`, 'i') } }, { name: 1, _id: 1 });
            // const Objectives = await ObjectivesModel.find({ name: { $regex: new RegExp(`^${searchTerm}`, 'i') } }, { name: 1, _id: 1 });
            // const Languages = await LanguagesModel.find({ name: { $regex: new RegExp(`^${searchTerm}`, 'i') } }, { name: 1, _id: 1 });
            // const Disorders = await DisordersModel.find({ name: { $regex: new RegExp(`^${searchTerm}`, 'i') } }, { name: 1, _id: 1 });
            // const autocomplete = [...Keyword, ...Objectives, ...Languages, ...Disorders]

            let getRecord = await ConsultantRegistrationModel.aggregate([
                { $match: { "active_status": 1, "verified_status": 1 } },
                {
                    $lookup: {
                        from: "consultanttimeslots",
                        localField: "_id",
                        foreignField: "consultantTimeId",
                        //pipeline: [{ $project: { SlotArray: 1,_id:0} }],
                        as: "TimeSlots",
                    },
                },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [{
                            $project: { _id: 0, profile_img: 1, }
                        }],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $project: {
                        title: 1,
                        given_name: 1,
                        gender: 1,
                        DOB: 1,
                        contact_number: 1,
                        ProfileAndKeyword: 1,
                        contact_number_isd: 1,
                        consultantTimeSlot: {
                            $concatArrays: ["$TimeSlots.Sunday", "$TimeSlots.Monday", "$TimeSlots.Tuesday", "$TimeSlots.Wednesday", "$TimeSlots.Thursday", "$TimeSlots.Friday", "$TimeSlots.Saturday"]
                        }
                    }
                }
            ]);

            res.json(getRecord);
        } catch (e) {
            res.json({ status: false, message: 'Something went Wrong!!' });
        }
    }

    static async getComplaintType(req, res) {
        try {
            const getRecord = await ComplaintTypeModel.find({ status: 1 }, { name: 1, _id: 1 });
            if (getRecord.length > 0) {
                res.json({ 'status': 200, 'data': getRecord });
            } else {
                res.status(500).json({ 'status': 500, 'message': 'Record Not Found' });
            }
        } catch (error) {
            res.status(500).json({ 'message': error.message });
        }
    }

    static async ComplaintByClient(req, res) {
        try {

            let attachment = null;
            if (req.file && req.file?.filename) {
                attachment = '/uploads/blog_image/' + req.file.filename
            }

            await ComplaintModel.create({
                raised_by: req.userTokenDetails.user_id,
                raised_against: req.body.raised_against,
                type: req.body.type,
                complaint_type: req.body.complaint_type,
                additional_details: req.body.additional_details,
                attachment,
            });
            return res.json({ 'status': 200, 'message': 'Your Complaint Send Successfully.' });
        } catch (error) {
            return res.json({ 'status': 200, 'message': error.message });
        }
    }

    static async getComplaintRaisedByClient(req, res) {
        const user_id = req.userTokenDetails.user_id;
        try {
            const BlogRecord = await ComplaintModel.aggregate([
                { $match: { "raised_by": new mongoose.Types.ObjectId(user_id) } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1 } }],
                        as: "clientName",
                    },
                },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1 } }],
                        as: "consultantName",
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
                        action_type: 1, status: 1, decision_favour: 1, attachment: 1, des: 1, additional_details: 1,
                        raised_byName: { $arrayElemAt: ["$clientName.given_name", 0] },
                        raised_againstName: { $arrayElemAt: ["$consultantName.given_name", 0] },
                        complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                    }
                }
            ]);

            if (BlogRecord.length === 0) {
                res.json({ 'status': 200, 'data': 'Record Not Found!!' });
            } else {
                res.json({ 'status': 200, 'data': BlogRecord });
            }

        } catch (error) {
            res.json({ 'status': 500, 'message': error.message });
        }


    }

    static async getComplaintagainstByClient(req, res) {
        const user_id = req.userTokenDetails.user_id;

        try {

            const BlogRecord = await ComplaintModel.aggregate([
                { $match: { "raised_against": new mongoose.Types.ObjectId(user_id) } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1 } }],
                        as: "clientName",
                    },
                },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1 } }],
                        as: "consultantName",
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
                        action_type: 1, status: 1, decision_favour: 1, attachment: 1, des: 1, additional_details: 1,
                        clientName: { $arrayElemAt: ["$clientName.given_name", 0] },
                        consultantName: { $arrayElemAt: ["$consultantName.given_name", 0] },
                        complaintType: { $arrayElemAt: ["$complaintType.name", 0] }
                    }
                }
            ]);

            if (BlogRecord.length === 0) {
                res.json({ 'status': false, 'data': 'Record Not Found!!' });
            } else {
                res.json({ 'status': 200, 'data': BlogRecord });
            }

        } catch (error) {
            res.json({ 'status': 500, 'message': error.message });
        }
    }

    static async getComplaintRaisedByConsultant(req, res) {
        const user_id = req.userTokenDetails.user_id;
        try {
            const BlogRecord = await ComplaintModel.aggregate([
                { $match: { "raised_by": new mongoose.Types.ObjectId(user_id) } },
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
                                    pipeline: [{ $project: { _id: 0, profile_img: 1 } }],
                                    as: "consultantProfile",
                                },
                            },
                            { $project: { _id: 0, given_name: 1, "consultantProfile": "$consultantProfile.profile_img" } }],
                        as: "consultantName",
                    },
                },
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
                                    pipeline: [{ $project: { _id: 0, profile_image: 1 } }],
                                    as: "clientProfile",
                                },
                            },
                            { $project: { _id: 0, given_name: 1, "clientProfile": "$clientProfile.profile_image" } }],
                        as: "clientName",
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
                        action_type: 1, status: 1, decision_favour: 1, attachment: 1, des: 1, additional_details: 1,
                        raised_againstName: { $arrayElemAt: ["$clientName.given_name", 0] },
                        raised_byName: { $arrayElemAt: ["$consultantName.given_name", 0] },
                        complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                    }
                }
            ]);

            if (BlogRecord.length === 0) {
                res.json({ 'status': false, 'data': 'Record Not Found!!' });
            } else {
                res.json({ 'status': 200, 'data': BlogRecord });
            }

        } catch (error) {
            res.json({ 'status': 500, 'message': error.message });
        }


    }

    static async getComplaintagainstByConsultant(req, res) {

        try {
            const user_id = req.userTokenDetails.user_id;
            const BlogRecord = await ComplaintModel.aggregate([
                { $match: { "raised_against": new mongoose.Types.ObjectId(user_id) } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "raised_against",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1 } }],
                        as: "consultantName",
                    },
                },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "raised_by",
                        foreignField: "_id",
                        pipeline: [{ $project: { _id: 0, given_name: 1 } }],
                        as: "clientName",
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
                        action_type: 1, status: 1, decision_favour: 1, attachment: 1, des: 1, additional_details: 1,
                        raised_byName: { $arrayElemAt: ["$clientName.given_name", 0] },
                        raised_againstName: { $arrayElemAt: ["$consultantName.given_name", 0] },
                        complaintType: { $arrayElemAt: ["$complaintType.name", 0] },
                    }
                }
            ]);

            if (BlogRecord.length === 0) {
                res.json({ 'status': 200, 'data': 'Record Not Found!!' });
            } else {
                res.json({ 'status': 200, 'data': BlogRecord });
            }

        } catch (error) {
            res.json({ 'status': 500, 'message': error.message });
        }
    }

    static async FavouriteBlogRecord(req, res) {
        const user_id = req.userTokenDetails.user_id;
        try {

            const getFavourite = await FavoriteBlogModel.findOne({ client_bookid: user_id }).count()

            if (getFavourite > 0) {
                const getFavourite = await FavoriteBlogModel.findOne({ client_bookid: user_id })
                res.json({ 'status': 200, 'data': getFavourite });
            }
            else {
                res.json({ 'status': 200, 'message': 'Record Not Found' });
            }
        }
        catch (error) {
            res.json({ 'status': 500, 'message': error.message });
        }
    }

    static async ClientFavouriteBlog(req, res) {

        const user_id = req.userTokenDetails.user_id;
        const getFavourite = await FavoriteBlogModel.findOne({ client_bookid: user_id }).count()
        if (getFavourite == 0) {

            await FavoriteBlogModel.create({
                client_bookid: user_id,
                authurId: req.body.authurId, keyword: req.body.keyword,
                disorder: req.body.disorder, objective: req.body.objective,
            })

            res.json({ 'status': 200, 'message': 'Record Add Successfully' });
        } else {
            await FavoriteBlogModel.updateOne({ client_bookid: user_id }, {
                authurId: req.body.authurId, keyword: req.body.keyword,
                disorder: req.body.disorder, objective: req.body.objective,
            });

            res.json({ 'status': 200, 'message': 'Record Update Successfully' });
        }

    }

    static async getAuthor(req, res) {
        try {
            const Consultant = await ConsultantRegistrationModel.find({ verified_status: 1, active_status: 1 }, { name: "$given_name" });
            const admin = await AdminModel.find({}, { name: 1 });

            const authors = [...Consultant, ...admin]
            if (authors) {
                res.json({ 'status': 200, 'data': authors });
            } else {
                throw new Error('Record Does Not Exist');
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDigitalProduct(req, res) {
        try {
            const getAllRecord = await DigitalProductModel.aggregate([
                { $match: { status: 1, deleted_at: null } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "author_name",
                        foreignField: "_id",
                        pipeline: [{ $project: { given_name: 1 } }],
                        as: "authorDetails",
                    },
                },
                {
                    $project:
                    {
                        title: 1, subtitletitle: 1, author_name: 1, des: 1, pdf: 1, image: 1, date: 1, authorDetail: "$authorDetails.given_name"
                    }
                }
            ]);

            if (getAllRecord.length > 0) {
                res.json({ 'status': 200, 'data': getAllRecord.map(row => row) });
            } else {
                res.json({ 'status': 502, 'message': 'Record Not found' });
            }
        } catch (e) {
            res.json({ 'status': 502, 'message': 'Record Not found' });
        }
    }

    static async getPrivacyPolicy(req, res) {
        try {
            const getAllRecord = await PrivacyPolicyModel.find({ active_tc: 1, deleted_at: null }, { content: 1, active_tc: 1 });

            if (getAllRecord) { res.json({ 'status': 200, 'data': getAllRecord }); } else { throw new Error('Record Does Not Exist'); }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getTermConditions(req, res) {
        try {
            const getAllRecord = await TermConditionModel.find({ active_tc: 1, deleted_at: null }, { content: 1, active_tc: 1 });
            if (getAllRecord) { res.json({ 'status': 200, 'data': getAllRecord }); } else { throw new Error('Record Does Not Exist'); }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async favouriteBlog(req, res) {
        try {
            const user_id = req.userTokenDetails.user_id;
            const getFavourite = await FavoriteBlogModel.findOne({ client_bookid: new mongoose.Types.ObjectId(user_id) })

            const Consultant = await BlogModel.aggregate([
                {
                    $match: {
                        $or: [
                            { "keywords": { $in: getFavourite.keyword } },
                            { "disorder": { $in: getFavourite.disorder } },
                            { "objective": { $in: getFavourite.objective } },
                            { "author_name": { $in: getFavourite.authurId } }
                        ]
                    }
                }
            ])

            res.json({ 'status': 200, 'data': Consultant });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getZegoToken(req, res) {
        try {
            // // Please modify appID to your own appId. appid is a number.
            // const appID = getEnv().ZEGOCLOUD_APPID;
            // const serverSecret = getEnv().ZEGOCLOUD_SERVERSECRET;

            // // Please modify userId to the user's userId.
            // const userId = 'user1';// type: string

            // //type: number; unit: s; expiration time of token, in seconds.
            // const effectiveTimeInSeconds = 3600;

            // // When generating a basic authentication token, the payload should be set to an empty string.
            // const payload = req.params.room;

            // // Build token 
            // const token = generateToken04(appID, userId, serverSecret, effectiveTimeInSeconds, payload);

            var user_id = req.userTokenDetails.user_id;

            const getRecord = await BookingModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.params.room) } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "consultant_bookid",
                        foreignField: "_id",
                        pipeline: [{
                            $project: {
                                title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1
                            }
                        }],
                        as: "ConsultantDetails",
                    },
                },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "client_bookid",
                        foreignField: "_id",
                        pipeline: [{
                            $project: {
                                title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1
                            }
                        }],
                        as: "ClientDetails",
                    },
                },
                {
                    $project: {
                        _id: 1, consultant_bookid: 1, client_bookid: 1, amount: 1, fees: 1, book_date: 1, book_time: 1, pdf_path: 1, paymentStatus: 1,
                        orderId: 1, paymentId: 1, signature: 1,
                        ConsultantDetails: { $arrayElemAt: ["$ConsultantDetails", 0] },
                        ClientDetails: { $arrayElemAt: ["$ClientDetails", 0] },
                    }
                }
            ]);

            if (getRecord.length > 0) {
                var first = getRecord[0];
                if (![first.consultant_bookid.toString(), first.client_bookid.toString()].includes(user_id))
                    return res.status(401).json({ status: false, message: "Unauthorized access..!!", data: [] });

                if (!Utils.myMoment().isBetween(Utils.myMoment(first.book_date).startOf('hour'), Utils.myMoment(first.book_date).endOf('hour'), null, '[]'))
                    return res.status(401).json({ status: false, message: "Time not match..!!", data: [] });


                return res.json({ status: true, message: "Success", data: first });
            } else {
                return res.status(404).json({ status: false, message: "Meeting Not Found", data: [] });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}