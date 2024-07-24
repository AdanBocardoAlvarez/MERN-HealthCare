import mongoose from "mongoose";
import ConsultantRegistrationModel from "../../model/Consultant/Registration/ConsultantRegistrationModel";
import ClientRegistrationModel from "../../model/Client/Registration/ClientRegistrationModel";
import BookingModel from "../../model/Client/Registration/BookingModel";

import ConsultantBasicDetails from '../../model/Consultant/Registration/ConsultantBasicDetails';
import ConsultantBankDetailsModel from '../../model/Consultant/Registration/ConsultantBankDetailsModel';
import ConsultantCertificateModel from '../../model/Consultant/Registration/ConsultantCertificateModel';
import ConsultantProfileAndKeywordDetailsModel from '../../model/Consultant/Registration/ConsultantProfileAndKeywordDetailsModel';
import ConsultantEducationDetailsModel from '../../model/Consultant/Registration/ConsultantEducationDetailsModel';
import fs from 'fs';
import ConsultantFeesDetails from "../../model/Consultant/Registration/ConsultantFeesDetails";
import ConsultantTimeSlotModel from "../../model/Consultant/Registration/ConsultantTimeSlotModel";
import { blueMailer } from "../../utils/blueMailer";
import { MailTemplate } from "../../utils/MailTemplate";
import ClientBasicDetails from "../../model/Client/Registration/ClientBasicDetails";

export class ConsultantController {

    static async getConsultant(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10000;
        const search_title = req.query.search;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {
            const serviceCount = await ConsultantRegistrationModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) { throw Error('Record Not Found'); }

            let getAllService;
            if (!search_title) {
                getAllService = await ConsultantRegistrationModel.find({ deleted_at: null }
                    , {
                        _id: 1, title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number_isd: 1, contact_number: 1,
                        alternative_number_isd: 1, alternative_number: 1, contact_number_whatapp: 1, preferred_type: 1, verified_status: 1, active_status: 1
                    }
                ).skip((perPage * page) - perPage).limit(perPage);

            }
            else {
                getAllService = await ConsultantRegistrationModel.find({ deleted_at: null, email: { $regex: search_title, $options: 'i' } }
                    , {
                        _id: 1, title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number_isd: 1, contact_number: 1,
                        alternative_number_isd: 1, alternative_number: 1, contact_number_whatapp: 1, preferred_type: 1, verified_status: 1, active_status: 1
                    }
                ).skip((perPage * page) - perPage).limit(perPage);
            }

            res.json({ 'status': true, data: getAllService, pageToken: pageToken, totalPages: totalPages, currentPage: currentPage, prevPage: prevPage });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async ConsultantTemporyDelete(req, res) {
        const getRecordCount = await ConsultantRegistrationModel.findOne({ _id: req.query.id }).count();
        if (getRecordCount > 0) {
            const getRecord = await ConsultantRegistrationModel.findOneAndUpdate({ _id: req.query.id }, { deleted_at: new Date() });
            if (getRecord) {
                const Name = getRecord.given_name
                const Contant = `<p>We are saddened to see you leave our community. Your account on VhealTHY has been deleted. 
                    If you need any support or have any questions, do not hesitate to reach out to us.
                 </p> <p>Thank you for being a part of our journey.🌿</p>`

                await blueMailer.sendEmail({
                    to: getRecord.email,
                    subject: 'Account Deletion Notification - VhealTHY',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                })
            }
            res.json({ 'status': 200, 'message': 'Account Tempory Delete Successfully' });
        }
        else {
            res.json({ 'status': 200, 'message': 'User Not Found!!' });
        }
    }

    static async DeleteConsultantAccount(req, res) {
        const getRecordCount = await ConsultantRegistrationModel.findOne({ ConsultantID: req.query.id }).count();
        if (getRecordCount > 0) {
            const ConsultantList = await ConsultantRegistrationModel.findOne({ ConsultantID: req.query.id, deleted_at: null });
            const Name = ConsultantList.given_name
            const Contant = `<p>We are saddened to see you leave our community. Your account on VhealTHY has been deleted. 
                    If you need any support or have any questions, do not hesitate to reach out to us.
                    </p> <p>Thank you for being a part of our journey.🌿</p>`
            await blueMailer.sendEmail({
                to: ConsultantList.email,
                subject: 'Account Deletion Notification - VhealTHY',
                html: await MailTemplate.webTemplate({ Name, Contant }),
            })

            // BasicDetails start
            let BasicDetails = await ConsultantBasicDetails.findOne({ 'consultantUserId': new mongoose.Types.ObjectId(ConsultantList._id) }).count();
            if (BasicDetails > 0) {
                let GetBasicImages = await ConsultantBasicDetails.findOne({ 'consultantUserId': new mongoose.Types.ObjectId(ConsultantList._id) }, { id_number_attachment: 1, criminal_record_attachment: 1 });
                if (!!GetBasicImages.id_number_attachment && GetBasicImages.id_number_attachment != null) {
                    console.log(GetBasicImages.id_number_attachment)
                    fs.unlink(GetBasicImages.id_number_attachment, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }

                if (!!GetBasicImages.criminal_record_attachment && GetBasicImages.criminal_record_attachment != null) {
                    console.log(GetBasicImages.criminal_record_attachment)
                    fs.unlink(GetBasicImages.criminal_record_attachment, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }
                await ConsultantBasicDetails.findOneAndDelete({ 'consultantUserId': new mongoose.Types.ObjectId(ConsultantList._id), deleted_at: { $ne: null } });
            }

            // BankDetails start
            let BankDetails = await ConsultantBankDetailsModel.findOne({ 'consultant_bankUser': new mongoose.Types.ObjectId(ConsultantList._id) }).count();
            if (BankDetails > 0) {
                let GetBankImage = await ConsultantBankDetailsModel.findOne({ 'consultant_bankUser': new mongoose.Types.ObjectId(ConsultantList._id) }, { add_bank_information: 1 });
                //const imagePath = 'path_to_your_image_folder/image.jpg'; // Replace with the actual path to your image
                if (!!GetBankImage.add_bank_information && GetBankImage.add_bank_information != null) {
                    console.log(GetBankImage.add_bank_information)
                    fs.unlink(GetBankImage.add_bank_information, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }

                await ConsultantBankDetailsModel.findOneAndDelete({ 'consultant_bankUser': new mongoose.Types.ObjectId(ConsultantList._id) }, { add_bank_information: 1 });
            }
            // BankDetails start

            // UserCertificateDetail start 
            let UserCertificateDetail = await ConsultantCertificateModel.findOne({ 'userCertificate': new mongoose.Types.ObjectId(ConsultantList._id) }).count();
            if (UserCertificateDetail > 0) {
                let GetCertificateImage = await ConsultantCertificateModel.findOne({ 'userCertificate': new mongoose.Types.ObjectId(ConsultantList._id) }, { certificate_attachment: 1 });
                //const imagePath = 'path_to_your_image_folder/image.jpg'; // Replace with the actual path to your image
                if (!!GetCertificateImage.certificate_attachment && GetCertificateImage.certificate_attachment != null) {
                    console.log(GetCertificateImage.certificate_attachment)
                    fs.unlink(GetCertificateImage.certificate_attachment, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }
                await ConsultantCertificateModel.findOneAndDelete({ 'userCertificate': new mongoose.Types.ObjectId(ConsultantList._id) }, { certificate_attachment: 1 });
            }
            // end UserCertificateDetail

            // UserProfileAndKeywordDetail start 
            let UserProfileAndKeywordDetail = await ConsultantProfileAndKeywordDetailsModel.findOneAndDelete({ 'consultant_profileid': new mongoose.Types.ObjectId(ConsultantList._id) }).count();
            if (UserProfileAndKeywordDetail > 0) {
                let GetCertificateImage = await ConsultantProfileAndKeywordDetailsModel.findOne({ 'consultant_profileid': new mongoose.Types.ObjectId(ConsultantList._id) }, { profile_img: 1 });
                //const imagePath = 'path_to_your_image_folder/image.jpg'; // Replace with the actual path to your image
                if (!!GetCertificateImage.profile_img && GetCertificateImage.profile_img != null) {
                    console.log(GetCertificateImage.profile_img)
                    fs.unlink(GetCertificateImage.profile_img, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }
                await ConsultantProfileAndKeywordDetailsModel.findOneAndDelete({ 'consultant_profileid': new mongoose.Types.ObjectId(ConsultantList._id) });
            }
            // end UserProfileAndKeywordDetail

            // UserEducationDetails start 
            let UserEducationDetails = await ConsultantEducationDetailsModel.findOne({ 'userEducation': new mongoose.Types.ObjectId(ConsultantList._id) }).count();
            if (UserEducationDetails > 0) {
                let GetEducationImage = await ConsultantEducationDetailsModel.findOne({ 'userEducation': new mongoose.Types.ObjectId(ConsultantList._id) }, { gra_degree_attachment: 1, post_degree_attachment: 1 });
                //const imagePath = 'path_to_your_image_folder/image.jpg'; // Replace with the actual path to your image
                if (!!GetEducationImage?.gra_degree_attachment && GetEducationImage.gra_degree_attachment != null) {
                    console.log(GetEducationImage.gra_degree_attachment)
                    fs.unlink(GetEducationImage.gra_degree_attachment, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }

                if (!!GetEducationImage?.post_degree_attachment && GetEducationImage.post_degree_attachment != null) {
                    console.log(GetEducationImage.post_degree_attachment)
                    fs.unlink(GetEducationImage.post_degree_attachment, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('File deleted successfully');
                        }
                    });
                }
                await ConsultantEducationDetailsModel.findOneAndDelete({ 'userEducation': new mongoose.Types.ObjectId(ConsultantList._id) });
            }
            // end UserEducationDetails
            await ConsultantFeesDetails.findOneAndDelete({ ConsultantID: req.query.id });
            await ConsultantTimeSlotModel.findOneAndDelete({ consultantTimeId: req.query.id });
            await ConsultantRegistrationModel.findOneAndDelete({ ConsultantID: req.query.id, deleted_at: { $ne: null } });

            res.json({ 'status': 200, 'message': 'Account Tempory Delete Successfully' });
        }
        else {
            res.json({ 'status': 200, 'message': 'User Not Found!!' });
        }
    }

    static async getSingleConsultant(req, res) {
        const userId = req.query.userId;
        try {
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
                                    countryOfBirth: { $arrayElemAt: ["$countryOfBirth.name", 0] },
                                    CorrespondenceLanguage: { $arrayElemAt: ["$CorrespondenceLanguage.name", 0] },
                                    nationality: { $arrayElemAt: ["$nationality.name", 0] }
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
                                    street_name2: 1, postal_code: 1, CountryOfResidence: { $arrayElemAt: ["$CountryOfResidence.name", 0] },
                                    City: { $arrayElemAt: ["$City.name", 0] }
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
                                    account_currency: 1, add_bank_information: 1, CountryName: { $arrayElemAt: ["$CountryName.name", 0] }
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
                //                     edu_resume: 1,
                //                     graduate_country: { $arrayElemAt: ["$graduate_country.name", 0] },
                //                     post_country: { $arrayElemAt: ["$post_country.name", 0] },
                //                     disorderName: "$disorderName.name",
                //                     SpecializationName: "$SpecializationName.name"
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
                            { $project: { _id: 0, profile_img: 1, bio: 1, intro_vedio: 1, KeywordsName: 1, ObjectivesName: 1, professionalCounseling: 1 } }
                        ],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $lookup: {
                        from: "consultantbasicdetails",
                        localField: "_id",
                        foreignField: "consultantUserId",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "languages",
                                    localField: "spoken_language",
                                    foreignField: "_id",
                                    pipeline: [{ $project: { name: 1, _id: 0 } }],
                                    as: "spokenLanguageName",
                                },
                            },
                            {
                                $set: {
                                    spokenLanguageName: { $map: { input: "$spokenLanguageName", as: "row", in: "$$row.name" } },
                                }
                            },
                        ],
                        as: "SpokenLanguageName",
                    },
                },
                {
                    $lookup: {
                        from: "consultantcertificatemodels",
                        localField: "_id",
                        foreignField: "userCertificate",
                        as: "Certificates",
                    },
                },
                {
                    $project: {
                        title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number: 1,
                        alternative_number: 1, contact_number_isd: 1, alternative_number_isd: 1, contact_number_whatapp: 1, preferred_type: 1,
                        verified_status: 1, active_status: 1, document: 1, Certificates: 1,
                        consultantDegrees: 1,
                        fees: { $arrayElemAt: ["$consultantFees.fees", 0] },
                        BasicDetails: { $arrayElemAt: ["$BasicDetails", 0] },
                        AddressDetails: { $arrayElemAt: ["$AddressDetails", 0] },
                        BankDetails: { $arrayElemAt: ["$BankDetails", 0] },
                        EducationDetails: { $arrayElemAt: ["$EducationDetails", 0] },
                        TimeSlot: { $arrayElemAt: ["$TimeSlot", 0] },
                        ProfileAndKeyword: { $arrayElemAt: ["$ProfileAndKeyword", 0] },
                        SpokenLanguageName: { $arrayElemAt: ["$SpokenLanguageName.spokenLanguageName", 0] }
                    }
                }
            ]);

            if (getAllService.length > 0) {
                res.json({ 'status': true, data: getAllService[0] });
            } else {
                res.json({ 'status': false, data: [] });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async verifyConsultant(req, res) {
        try {
            await ConsultantRegistrationModel.updateOne({ _id: req.body.id }, { verified_status: req.body.verified_status });
            if (req.body.verified_status == 1) {
                const getRecord = await ConsultantRegistrationModel.findOne({ _id: req.body.id }, { given_name: 1, email: 1, contact_number: 1, contact_number_isd: 1 });
                const Name = getRecord.given_name
                const Contant = `We are delighted to confirm your registration with VhealTHY! Your information is currently under review. Upon submission of all mandatory documents as stipulated in the contract, you shall be soon set to provide wellbeing services on the VhealTHY platform. Meanwhile, do not hesitate to complete your profile on the platform 🌿`
                await blueMailer.sendEmail({
                    to: getRecord.email,
                    subject: 'Profile Verified - Access VhealTHY',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                })

            }

            res.json({ 'status': true, 'message': 'User Verify Successfully' });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async ActiveConsultant(req, res) {
        try {
            await ConsultantRegistrationModel.updateOne({ _id: req.body.id }, { active_status: req.body.active_status });
            if (req.body.active_status == 1) {
                res.json({ 'status': 200, 'message': 'User Activate Successfully' });
            } else if (req.body.active_status == 2) {
                const getRecord = await ConsultantRegistrationModel.findOne({ _id: req.body.id }, { given_name: 1, email: 1, contact_number_isd: 1, contact_number: 1 });
                const Name = getRecord.given_name
                const Contant = `We regret to inform you that your account on VhealTHY has been suspended. Kindly contact our support team for further assistance 🌿`
                await blueMailer.sendEmail({
                    to: getRecord.email,
                    subject: 'Account Suspension Notice - VhealTHY',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                })

                // const MobileNumber = `${getRecord.contact_number_isd}${getRecord.contact_number}`
                // const SmsMessage = "Your account on VhealTHY has been suspended. Please contact support."
                // const smsRespone = await Utils.sendSMS(Number(MobileNumber),SmsMessage)
                res.json({ 'status': 200, 'message': 'User Suspension Successfully' });
            } else {
                res.json({ 'status': 200, 'message': 'User Deactivate Successfully' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async addConsultantFees(req, res) {
        try {
            const getRecordCount = await ConsultantFeesDetails.findOne({ ConsultantID: req.body.id }).count();
            if (getRecordCount == 0) {

                await ConsultantFeesDetails.create({ ConsultantID: req.body.id, fees: req.body.fees, created_at: new Date() })
                res.json({ 'status': 200, 'message': 'Record Add Successfully' });
            } else {
                await ConsultantFeesDetails.updateOne({ ConsultantID: req.body.id }, { fees: req.body.fees });
                res.json({ 'status': 200, 'message': 'Fees Update Successfully' });
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantFees(req, res) {
        try {
            const getRecordCount = await ConsultantFeesDetails.findOne({ ConsultantID: req.query.id }).count();
            const save = await ConsultantFeesDetails.findOne({ ConsultantID: req.query.id })
            res.json({ 'status': 200, 'data': save, 'count': getRecordCount });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }

    }

    static async addConsultantSessionTime(req, res) {
        try {
            const SlotTime = req.body.SlotTime;
            const UserId = req.body.id;
            const getRecordCount = await ConsultantTimeSlotModel.findOne({ consultantTimeId: UserId }).count();
            if (getRecordCount > 0) {
                await ConsultantTimeSlotModel.updateOne({ consultantTimeId: UserId }, { SlotTime: SlotTime });
                res.json({ 'status': 200, 'message': 'Session Time Update Successfully' });
            } else {
                res.json({ 'status': false, 'message': 'Please Update Weekly Time Slot' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getConsultantSessionTime(req, res) {
        try {
            const UserId = req.query.id;
            const getRecordCount = await ConsultantTimeSlotModel.findOne({ consultantTimeId: UserId }).count();
            const save = await ConsultantTimeSlotModel.findOne({ consultantTimeId: UserId }, { SlotTime: 1 })
            res.json({ 'status': 200, 'data': save.SlotTime, 'count': getRecordCount });
        } catch (error) {
            res.json({ 'status': 200, 'message': error.message });
        }
    }

    static async getConsultantBooking(req, res) {
        try {
            const getRecord = await BookingModel.aggregate([
                { $match: { consultant_bookid: new mongoose.Types.ObjectId(req.query.userId) } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "client_bookid",
                        foreignField: "_id",
                        pipeline: [{
                            $project: {
                                title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1,
                                email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1
                            }
                        }],
                        as: "ClientDetails",
                    },
                },
            ])

            res.json({ 'status': 200, data: getRecord });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    /* Client Code Start */
    static async getClient(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10000;
        const search_title = req.query.search;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {

            const serviceCount = await ClientRegistrationModel.find({ deleted_at: null }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) { throw Error('Record Not Found'); }

            let getAllService;
            if (!search_title) {
                getAllService = await ClientRegistrationModel.aggregate([
                    { $match: { deleted_at: null } },
                    {
                        $lookup: {
                            from: "clientbasicdetails",
                            localField: "_id",
                            foreignField: "clientUserId",
                            pipeline: [{
                                $project: {
                                    Correspondence_language: 1, spoken_language: 1, profession: 1, country_of_birth: 1, nationality: 1, house_number: 1, currency_used: 1,
                                    street_name: 1, street_name2: 1, postal_code: 1, profile_image: 1
                                }
                            }],
                            as: "ClientDetails",
                        },
                    },
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
                            title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, active_status: 1, verified_status: 1,
                            DOB: 1, email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1,
                            city: { $arrayElemAt: ["$City.name", 0] },
                            country_of_residence: { $arrayElemAt: ["$CountryOfResidence.name", 0] },
                            ClientDetails: { $arrayElemAt: ["$ClientDetails", 0] },
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage)
            } else {

                getAllService = await ClientRegistrationModel.aggregate([
                    { $match: { deleted_at: null, email: { $regex: search_title, $options: 'i' } } },
                    {
                        $lookup: {
                            from: "clientbasicdetails",
                            localField: "_id",
                            foreignField: "clientUserId",
                            pipeline: [{
                                $project: {
                                    Correspondence_language: 1, spoken_language: 1, profession: 1, country_of_birth: 1, nationality: 1, house_number: 1, currency_used: 1,
                                    street_name: 1, street_name2: 1, postal_code: 1, profile_image: 1
                                }
                            }],
                            as: "ClientDetails",
                        },
                    },
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
                            title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, active_status: 1, verified_status: 1,
                            DOB: 1, email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1,
                            city: { $arrayElemAt: ["$City.name", 0] },
                            country_of_residence: { $arrayElemAt: ["$CountryOfResidence.name", 0] },
                            ClientDetails: { $arrayElemAt: ["$ClientDetails", 0] },
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage)

            }
            res.json({ 'status': true, data: getAllService, pageToken: pageToken, totalPages: totalPages, currentPage: currentPage, prevPage: prevPage });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getTrashClient(req, res) {
        const page = parseInt(req.query.page) || 1;
        const show = parseInt(req.query.show) || 10000;
        const search_title = req.query.search;

        const perPage = show;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;
        let totalPages;

        try {

            const serviceCount = await ClientRegistrationModel.find({ deleted_at: { $ne: null } }).count();
            totalPages = Math.ceil(serviceCount / perPage);
            if (totalPages === page || totalPages === 0) {
                pageToken = null;
            }
            if (page > totalPages) { throw Error('Record Not Found'); }

            let getAllService;
            if (!search_title) {
                getAllService = await ClientRegistrationModel.aggregate([
                    { $match: { deleted_at: { $ne: null } } },
                    {
                        $lookup: {
                            from: "clientbasicdetails",
                            localField: "_id",
                            foreignField: "clientUserId",
                            pipeline: [{
                                $project: {
                                    Correspondence_language: 1, spoken_language: 1, profession: 1, country_of_birth: 1, nationality: 1, house_number: 1, currency_used: 1,
                                    street_name: 1, street_name2: 1, postal_code: 1, profile_image: 1
                                }
                            }],
                            as: "ClientDetails",
                        },
                    },
                    {
                        $project: {
                            title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1,
                            DOB: 1, deleted_at: 1, email: 1, contact_number: 1, contact_number_isd: 1,
                            preferred_type: 1, city: 1, country_of_residence: 1, ClientDetails: "$ClientDetails"
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage)
            }
            else {

                getAllService = await ClientRegistrationModel.aggregate([
                    { $match: { deleted_at: { $ne: null }, email: { $regex: search_title, $options: 'i' } } },
                    {
                        $lookup: {
                            from: "clientbasicdetails",
                            localField: "_id",
                            foreignField: "clientUserId",
                            pipeline: [{
                                $project: {
                                    Correspondence_language: 1, spoken_language: 1, profession: 1, country_of_birth: 1, nationality: 1, house_number: 1, currency_used: 1,
                                    street_name: 1, street_name2: 1, postal_code: 1, profile_image: 1
                                }
                            }],
                            as: "ClientDetails",
                        },
                    },
                    {
                        $project: {
                            title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1,
                            DOB: 1, email: 1, deleted_at: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1, city: 1, country_of_residence: 1, ClientDetails: "$ClientDetails"
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage)

            }
            res.json({ 'status': true, data: getAllService, pageToken: pageToken, totalPages: totalPages, currentPage: currentPage, prevPage: prevPage });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getClientBooking(req, res) {
        try {
            const getRecord = await BookingModel.aggregate([
                { $match: { client_bookid: new mongoose.Types.ObjectId(req.query.userId) } },
                {
                    $lookup: {
                        from: "consultantregistrations",
                        localField: "consultant_bookid",
                        foreignField: "_id",
                        pipeline: [{
                            $project: {
                                title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1,
                                email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1
                            }
                        }],
                        as: "ConsultantDetails",
                    },
                },
            ])

            res.json({ 'status': 200, data: getRecord });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getSingleClient(req, res) {
        const userId = req.query.userId;
        try {

            const getAllService = await ClientRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: "clientbasicdetails",
                        localField: "_id",
                        foreignField: "clientUserId",
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
                                    as: "nationalitys",
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
                                    _id: 0, profession: 1, house_number: 1, currency_used: 1,
                                    street_name: 1, street_name2: 1, postal_code: 1, profile_image: 1,
                                    countryOfBirth: { $arrayElemAt: ["$countryOfBirth.name", 0] },
                                    CorrespondenceLanguage: { $arrayElemAt: ["$CorrespondenceLanguage.name", 0] },
                                    nationalitys: { $arrayElemAt: ["$nationalitys.name", 0] },
                                    City: { $arrayElemAt: ["$City.name", 0] },
                                }
                            }
                        ],
                        as: "BasicDetails",
                    },
                },
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
                        title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, health_assessment: 1, consent_form: 1,
                        email: 1, contact_number: 1, alternative_number: 1, contact_number_isd: 1, alternative_number_isd: 1,
                        contact_number_whatapp: 1, preferred_type: 1, verified_status: 1, active_status: 1, "City": { $arrayElemAt: ["$City.name", 0] }, "CountryOfResidence": { $arrayElemAt: ["$CountryOfResidence.name", 0] }, "BasicDetails": { $arrayElemAt: ["$BasicDetails", 0] }
                    }
                }
            ]);

            if (getAllService.length > 0) {
                res.json({ 'status': true, message: "Success.", data: getAllService[0] });
            } else {
                res.json({ 'status': true, message: "No Record Found.", data: [] });
            }

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async verifyClient(req, res) {
        try {
            await ClientRegistrationModel.updateOne({ _id: req.body.id }, { verified_status: req.body.verified_status });

            if (req.body.verified_status == 1) {
                const getRecord = await ClientRegistrationModel.findOne({ _id: req.body.id }, { given_name: 1, email: 1, contact_number: 1, contact_number_isd: 1 });
                const Name = getRecord.given_name
                const Contant = `We are delighted to confirm your registration with VhealTHY! Your information is currently under review. Upon submission of all mandatory documents as stipulated in the contract, you shall be soon set to provide wellbeing services on the VhealTHY platform. Meanwhile, do not hesitate to complete your profile on the platform 🌿`

                await blueMailer.sendEmail({
                    to: getRecord.email,
                    subject: 'Profile Verified - Access VhealTHY',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                })
            }

            res.json({ 'status': true, 'message': 'User Verify Successfully' });

        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async ActiveClient(req, res) {
        try {
            await ClientRegistrationModel.updateOne({ _id: new mongoose.Types.ObjectId(req.body.id) }, { active_status: req.body.active_status });

            if (req.body.active_status == 1) {
                res.json({ 'status': 200, 'message': 'User Activate Successfully' });
            } else if (req.body.active_status == 2) {
                const getRecord = await ClientRegistrationModel.findOne({ _id: new mongoose.Types.ObjectId(req.body.id) }, { given_name: 1, email: 1, contact_number_isd: 1, contact_number: 1 });
                const Name = getRecord.given_name
                const Contant = `We regret to inform you that your account on VhealTHY has been suspended. Kindly contact our support team for further assistance 🌿`

                await blueMailer.sendEmail({
                    to: getRecord.email,
                    subject: 'Account Suspension Notice - VhealTHY',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                })

                res.json({ 'status': 200, 'message': 'User Suspension Successfully' });
            } else {
                res.json({ 'status': 200, 'message': 'User Deactivate Successfully' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async ClientTemporyDelete(req, res) {
        try {
            const getRecordCount = await ClientRegistrationModel.findOne({ _id: new mongoose.Types.ObjectId(req.query.id) }).count();
            if (getRecordCount > 0) {
                const getRecord = await ClientRegistrationModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.query.id) }, { deleted_at: new Date() });
                if (getRecord) {
                    const Name = getRecord.given_name
                    const Contant = `<p>We are saddened to see you leave our community. Your account on VhealTHY has been deleted. 
                                    If you need any support or have any questions, do not hesitate to reach out to us.
                                </p> <p>Thank you for being a part of our journey.🌿</p>`;

                    await blueMailer.sendEmail({
                        to: getRecord.email,
                        subject: 'Account Deletion Notification - VhealTHY',
                        html: await MailTemplate.webTemplate({ Name, Contant }),
                    })
                }

                res.json({ 'status': 200, 'message': 'Account Tempory Delete Successfully' });
            } else {
                res.json({ 'status': false, 'message': 'User Not Found!!' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async DeleteClientAccount(req, res) {
        try {
            const getRecordCount = await ClientRegistrationModel.findOne({ id: new mongoose.Types.ObjectId(req.query.id) }).count();
            if (getRecordCount > 0) {
                const ConsultantList = await ClientRegistrationModel.findOne({ id: new mongoose.Types.ObjectId(req.query.id), deleted_at: null });

                const Name = ConsultantList.given_name
                const Contant = `<p>We are saddened to see you leave our community. Your account on VhealTHY has been deleted. 
                                    If you need any support or have any questions, do not hesitate to reach out to us.
                                 </p> <p>Thank you for being a part of our journey.🌿</p>`;

                await blueMailer.sendEmail({
                    to: ConsultantList.email,
                    subject: 'Account Deletion Notification - VhealTHY',
                    html: await MailTemplate.webTemplate({ Name, Contant }),
                })

                // BasicDetails start
                let BasicDetails = await ClientBasicDetails.findOne({ 'clientUserId': new mongoose.Types.ObjectId(ConsultantList._id) }).count();
                if (BasicDetails > 0) {
                    let GetBasicImages = await ClientBasicDetails.findOne({ 'clientUserId': new mongoose.Types.ObjectId(ConsultantList._id) }, { profile_image: 1 });
                    if (!!GetBasicImages.profile_image && GetBasicImages.profile_image != null) {
                        fs.unlink(GetBasicImages.profile_image, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            } else {
                                console.log('File deleted successfully');
                            }
                        });
                    }

                    await ClientBasicDetails.findOneAndDelete({ 'clientUserId': new mongoose.Types.ObjectId(ConsultantList._id), deleted_at: { $ne: null } });
                }
                // BasicDetails End
                await ClientRegistrationModel.findOneAndDelete({ id: new mongoose.Types.ObjectId(req.query.id), deleted_at: { $ne: null } });

                res.json({ 'status': 200, 'message': 'Account Tempory Delete Successfully' });
            } else {
                res.json({ 'status': false, 'message': 'User Not Found!!' });
            }
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }
}