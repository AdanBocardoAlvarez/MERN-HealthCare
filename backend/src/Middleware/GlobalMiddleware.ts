import mongoose from "mongoose";
import JWT from 'jsonwebtoken';
import { validationResult } from "express-validator";
import { getEnv } from "../environments/env";
import ConsultantRegistrationModel from "../model/Consultant/Registration/ConsultantRegistrationModel";
import ClientRegistrationModel from "../model/Client/Registration/ClientRegistrationModel";

type IDecoded = {
    user_id: string;
    unique_code: string;
    email_id: string;
    contact_number: number;
    gender: string;
    verified_status: number;
    active_status: number;
}

export class GlobleMiddleware {

    static checkError(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new Error(errors.array()[0].msg));
            return;
        } else {
            next();
        }
    }

    static async checkLicense(req, res, next) {
        const licenseKey = req.headers['x-api-key'];
        if (req.originalUrl.startsWith('/uploads/') || licenseKey === getEnv().API_KEY) {
            next();
        } else {
            return res.status(401).json({
                status: false,
                message: "License Missing",
                data: {}
            })
        }
    }

    static async checkAdmin(req, res, next) {
        try {

            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader.slice(7, authHeader.Length) : null;
            const decoded = JWT.verify(token, getEnv().jwt_secret_admin);

            req.userTokenDetails = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ 'status': false, 'message': 'User Not Authorised' });
        }
    }

    static async checkConsultant(req, res, next) {
        try {

            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader.slice(7, authHeader.Length) : null;

            const decoded: IDecoded | any = JWT.verify(token, getEnv().jwt_secret_consultant);
            const user = await ConsultantRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(decoded.user_id) } },
                {
                    $lookup: {
                        from: "consultantprofileandkeyworddetails",
                        localField: "_id",
                        foreignField: "consultant_profileid",
                        pipeline: [{ $project: { _id: 0, profile_img: 1 } }],
                        as: "ProfileAndKeyword",
                    },
                },
                {
                    $project: {
                        title: 1, timezone: 1, unique_code: 1, given_name: 1, family_name: 1, gender: 1, DOB: 1, contact_number_whatapp: 1, verified_status: 1, active_status: 1,
                        profile_img: { $concat: [process.env.BASEURL, { $arrayElemAt: ["$ProfileAndKeyword.profile_img", 0] }] },
                    }
                },
            ]);

            if (user.length > 0) {
                req.userTokenDetails = decoded;
                req.user = user[0];
                next();
            } else {
                return res.status(401).json({ 'status': false, 'message': 'User Not Authorised' });
            }
        } catch (error) {
            return res.status(401).json({ 'status': false, 'message': 'User Not Authorised' });
        }
    }

    static async checkClient(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader ? authHeader.slice(7, authHeader.Length) : null;

            const decoded: IDecoded | any = JWT.verify(token, getEnv().jwt_secret_client);
            const result = await ClientRegistrationModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(decoded.user_id) } },
                {
                    $lookup: {
                        from: "clientbasicdetails",
                        localField: "_id",
                        foreignField: "clientUserId",
                        pipeline: [{
                            $project: {
                                _id: 0, Correspondence_language: 1, spoken_language: 1, profession: 1, country_of_birth: 1, nationality: 1, house_number: 1, currency_used: 1,
                                street_name: 1, street_name2: 1, postal_code: 1, profile_image: 1
                            }
                        }],
                        as: "ClientDetails",
                    },
                },
                { $set: { ClientDetails: { $arrayElemAt: ["$ClientDetails", 0] } } },
                {
                    $project: {
                        title: 1, timezone: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, health_assessment: 1, consent_form: 1,
                        DOB: 1, email: 1, password: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1, city: 1, country_of_residence: 1, ClientDetails: "$ClientDetails"
                    }
                }
            ]);

            if (result.length > 0) {
                let first = result[0];
                let ClientDetails = first?.ClientDetails || {};
                delete first.ClientDetails;

                req.userTokenDetails = decoded;
                req.user = { ...ClientDetails, ...first }
                return next();
            } else {
                return res.status(401).json({ 'status': false, 'message': 'User Not Authorised' });
            }
        } catch (error) {
            return res.status(401).json({ 'status': false, 'message': 'User Not Authorised' });
        }
    }
}