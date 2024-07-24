
import mongoose from "mongoose";
import BookingModel from "../../../model/Client/Registration/BookingModel";
import ClientRegistrationModel from "../../../model/Client/Registration/ClientRegistrationModel";
import ClientBasicDetails from "../../../model/Client/Registration/ClientBasicDetails";
import { Utils } from "../../../utils/utils";
import NotesModel from "../../../model/Consultant/Registration/NotesModel";

export class ConsultantCommanController {

    static async getBookingDetails(req, res) {
        try {

            const UserId = req.userTokenDetails.user_id;
            let timezone = req.user.timezone || "Europe/Paris";

            var result = await BookingModel.aggregate([
                { $match: { consultant_bookid: new mongoose.Types.ObjectId(UserId), paymentStatus: 1 } },
                {
                    $lookup: {
                        from: "clientregistrations",
                        localField: "client_bookid",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $lookup: {
                                    from: "clientbasicdetails",
                                    localField: "_id",
                                    foreignField: "clientUserId",
                                    pipeline: [{
                                        $project: {
                                            _id: 0, profile_image: 1,  // Correspondence_language: 1, spoken_language: 1, profession: 1, country_of_birth: 1, nationality: 1, house_number: 1, currency_used: 1, street_name: 1, street_name2: 1, postal_code: 1
                                        }
                                    }],
                                    as: "BasicDetails",
                                },
                            },
                            {
                                $project: { title: 1, unique_code: 1, family_name: 1, given_name: 1, gender: 1, DOB: 1, email: 1, contact_number: 1, contact_number_isd: 1, preferred_type: 1, ProfileDetails: 1, profile_image: { $arrayElemAt: ["$BasicDetails.profile_image", 0] } }
                            }
                        ],
                        as: "ClientDetails",
                    },
                },
                { $sort: { created_at: -1 } },
                { $project: { _id: 1, client_bookid: 1, orderId: 1, amount: 1, fees: 1, book_date: 1, book_time: 1, pdf_path: 1, ClientDetails: { $arrayElemAt: ["$ClientDetails", 0] }, } }
            ]);

            var startHour = Utils.myMoment().startOf('hour');
            var endHour = Utils.myMoment().endOf('hour');
            result = result.map(row => {
                row.is_live = Utils.myMoment(row.book_date).isBetween(startHour, endHour, null, '[]');
                row.book_date = Utils.myMoment(row.book_date, timezone).format('lll | z')
                return row;
            });

            res.json({ 'status': true, 'data': result });
        } catch (error) {
            return res.json({ 'status': false, 'message': error.message });
        }
    }

    static async getDashboard(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id;
            const clientCount = [];

            let timezone = req.user.timezone || "Europe/Paris";

            const allRecord = await BookingModel.find({ consultant_bookid: new mongoose.Types.ObjectId(UserId), paymentStatus: 1 }, 'consultant_bookid client_bookid orderId amount fees book_date book_time InvoicNumber', { sort: { book_date: -1 } });
            allRecord.forEach((row, i) => {
                let client_bookid = row.client_bookid;
                if (!clientCount.some((element) => element.equals(client_bookid))) clientCount.push(client_bookid);
            });

            const todaySessions = allRecord.filter(row => Utils.myMoment(row.book_date, timezone).isSame(Utils.myMoment(undefined, timezone), 'day'));

            const myClients = await ClientRegistrationModel.find({ _id: { $in: clientCount } }, 'title given_name contact_number DOB').lean();

            const dateAfterWeek = Utils.myMoment(undefined, timezone).add(7, 'days').endOf('day');
            const nestWeekSessions = JSON.parse(JSON.stringify(allRecord)).map((row, i) => {
                let currentClient = myClients.find(curr => curr._id.equals(row.client_bookid.toString()));

                if (dateAfterWeek.isAfter(Utils.myMoment(row.book_date, timezone)) && myClients) {
                    return ({
                        ...row,
                        book_date: Utils.myMoment(row.book_date, timezone).format('lll'),
                        client_title: currentClient?.title,
                        client_name: currentClient?.given_name,
                        client_mobile: currentClient?.contact_number,
                        client_dob: currentClient?.DOB,
                        client_gender: currentClient?.gender,
                    })
                }
                return null;
            }).filter(row => row);

            let nextAppointment = null;
            if (nestWeekSessions.length > 0) {
                nextAppointment = nestWeekSessions[0];

                let basicDetails = await ClientBasicDetails.findOne({ clientUserId: new mongoose.Types.ObjectId(nextAppointment.client_bookid) });
                nextAppointment.profession = basicDetails?.profession;
                nextAppointment.nationality = basicDetails?.nationality;
                nextAppointment.profile_image = basicDetails?.profile_image;

                let lastCheck = await NotesModel.findOne({
                    clientId: new mongoose.Types.ObjectId(nextAppointment.client_bookid),
                    consultantId: new mongoose.Types.ObjectId(nextAppointment.consultant_bookid),
                }).sort('-created_at');

                nextAppointment.lastChecked = lastCheck?.created_at ? Utils.myMoment(lastCheck.created_at, timezone).format('lll') : 'No Data';
                nextAppointment.observation = lastCheck?.description || 'No Data';
            }

            res.json({
                'status': true, 'message': 'Success', data: {
                    user: req.user,
                    client_count: clientCount?.length || 0,
                    today_session_count: todaySessions?.length || 0,
                    next_week_sessions: nestWeekSessions,
                    next_appointment: nextAppointment
                }
            });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }
}