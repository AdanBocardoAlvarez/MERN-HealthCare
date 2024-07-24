import { getEnv } from "../../../environments/env";
import { blueMailer } from "../../../utils/blueMailer";
import BookingModel from "../../../model/Client/Registration/BookingModel";
import mongoose from "mongoose";
import { MailTemplate } from "../../../utils/MailTemplate";
import ConsultantRegistrationModel from "../../../model/Consultant/Registration/ConsultantRegistrationModel";
import ConsultantFeesDetails from "../../../model/Consultant/Registration/ConsultantFeesDetails";
import PDF from "../../../utils/PDF";
import { Utils } from '../../../utils/utils';
import ClientRegistrationModel from "../../../model/Client/Registration/ClientRegistrationModel";
import paypal from "@paypal/checkout-server-sdk";
const stripe = require('stripe')(getEnv().PAYMENT_SECREAT_KEY);

const clientId = getEnv().PAYPAL_CLIENT_ID;
const clientSecret = getEnv().PAYPAL_CLIENT_SECRET;

const environment_test = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const environment_live = new paypal.core.LiveEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(getEnv().PAYPAL_MODE === 'live' ? environment_live : environment_test);

export class ClientBookingController {

    static async mailInvoice(bookingDetails, clientDetails, ConsultantDetails) {
        try {

            var filePath = await PDF.generate({
                content: await MailTemplate.sendInvoiceTemplate({
                    Name: `${clientDetails.title} ${clientDetails.given_name}`.trim(),
                    Email: clientDetails.email,
                    City: clientDetails?.city?.name,
                    Country: clientDetails?.country_of_residence?.name,
                    InvoiceNumber: bookingDetails.InvoicNumber,
                    InvoiceDate: Utils.myMoment(bookingDetails['created_at'], clientDetails.timezone).format('ll | z'),
                    BookingDate: bookingDetails.book_date.toISOString(),
                    Amount: bookingDetails.amount,
                    Fees: bookingDetails.fees,
                }),
            });

            //---------------------------------------------------------------------------------------------------

            // Send Mail To Consulatant For Booking 
            let Name = ConsultantDetails.given_name
            const Contant = `You have a new appointment awaiting you and has been scheduled on the (${Utils.myMoment(bookingDetails.book_date, ConsultantDetails.timezone).format('LLL | z')}).<br /> Please log in to the VhealTHY platform to view the details <br/>`
            await blueMailer.sendEmail({
                to: ConsultantDetails.email,
                subject: 'New Appointment on VhealTHY',
                html: await MailTemplate.webTemplate({ Name, Contant }),
            });

            //---------------------------------------------------------------------------------------------------

            // Send Mail To Client For Payment Successfully
            const ClienName = clientDetails.given_name
            const ClientContant = `We are delighted to confirm your booking with ${Name} on ${Utils.myMoment(bookingDetails.book_date, clientDetails.timezone).format('LLL | z')}<br />
                    Your wellbeing is a priority, and ${Name} eagerly awaits our meeting.<br />
                    You can have a look at ${Name} profile following this link (${getEnv().front_base_url}our-experts/details/${ConsultantDetails._id} ).🌿<br />`

            await blueMailer.sendEmail({
                to: clientDetails.email,
                subject: `Confirmation of Your Booking on ${Utils.myMoment(bookingDetails.book_date, clientDetails.timezone).format('LLL | z')}`,
                html: await MailTemplate.webTemplate({ Name: ClienName, Contant: ClientContant }),
                attachmentContent: {
                    filename: `${bookingDetails.InvoicNumber}.pdf`,
                    path: filePath,
                    cid: bookingDetails.InvoicNumber
                },
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    static async CreatePayment(req, res) {
        try {

            const { consultant_id, bookingDate } = req.body;

            const consultant = await ConsultantRegistrationModel.findOne({ _id: new mongoose.Types.ObjectId(consultant_id) });
            if (!consultant) {
                return res.status(404).json({ 'status': false, 'message': "Consultant Details not Valid..!!" });
            }

            const feeData = await ConsultantFeesDetails.findOne({ ConsultantID: new mongoose.Types.ObjectId(consultant_id) });
            if (!feeData) {
                return res.status(422).json({ 'status': false, 'message': "Consultant Details not Valid..!!" });
            }

            if (!bookingDate || Utils.myMoment(bookingDate, consultant.timezone) === null) {
                return res.status(422).json({ 'status': false, 'message': "Please Provide valid booking date..!!" });
            }

            var bookDate = Utils.myMoment(bookingDate, consultant.timezone);

            const checkExist = await BookingModel.findOne({ client_bookid: req.userTokenDetails.user_id, book_date: bookDate, paymentStatus: 1 });
            if (checkExist) {
                return res.status(404).json({ 'status': false, 'message': "Consultant already have appointment at selected Time slot, Please choose other time slot.!!" });
            }

            const UserCount = await BookingModel.find().count()
            const paddedCounter = UserCount.toString().padStart(7, '0');
            const InvoicNumber = `INV${paddedCounter}`
            const orderId = `ORD${paddedCounter}`
            const amount = feeData?.fees;

            const customer = await stripe.customers.create({ name: `${req.user?.title} ${req.user?.given_name}`, email: req.userTokenDetails?.email_id });
            const paymentIntent = await stripe.paymentIntents.create({ customer: customer.id, amount: amount * 100, currency: 'eur', description: `Consultant "${consultant.title} ${consultant.given_name}" Book charge for ${InvoicNumber}` });

            const record = await BookingModel.create({
                consultant_bookid: consultant_id,
                client_bookid: req.userTokenDetails.user_id,
                amount: amount,
                fees: amount,
                InvoicNumber,
                orderId,
                book_date: bookDate.toISOString(), // new Date(bookingDate),
                book_time: bookDate.format('hh:mm:ss'),
                paymentId: null,
                paymentStatus: 0,
                clientSecret: paymentIntent.client_secret,
                created_at: Date.now(),
                updated_at: Date.now(),
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
                clientName: req.userTokenDetails?.unique_code,
                clientEmail: req.userTokenDetails?.email_id,
                paymentRecord: record._id,
            });
        } catch (error) {

            switch (error.type) {
                case 'StripeCardError':
                    return res.status(500).json({ 'status': false, 'message': `A Payment Error Occurred.` });
                case 'StripeInvalidRequestError':
                    return res.status(500).json({ 'status': false, 'message': 'An invalid request occurred.' });
                default:
                    return res.status(500).json({ 'status': false, 'message': error.message });
            }
        }
    }

    static async updatePayment(req, res) {
        try {

            var { client_secret, status, amount, id = null } = req.body;

            const paymentIntent = await stripe.paymentIntents.retrieve(id);
            const tranStatus = status === 'succeeded';

            let message = tranStatus ? "Payment Successfully..!!" : "Payment Failed..!!";
            let updatedData = await BookingModel.findOneAndUpdate({ client_bookid: req.userTokenDetails.user_id, clientSecret: client_secret }, {
                amount,
                paymentId: id,
                paymentStatus: tranStatus ? 1 : 2,
                updated_at: Date.now(),
            }, { new: true });

            if (tranStatus) {
                const consultant = await ConsultantRegistrationModel.findOne({ _id: updatedData.consultant_bookid });
                const ClientData = await ClientRegistrationModel.findById(req.user._id).populate([{ path: 'country_of_residence', select: 'name' }, { path: 'city', select: 'name' }])
                await ClientBookingController.mailInvoice(updatedData, ClientData, consultant)
            }

            res.status(200).json({ status: tranStatus, message, data: paymentIntent });
        } catch (error) {
            switch (error.type) {
                case 'StripeCardError':
                    return res.status(500).json({ 'status': false, 'message': `A Payment Error Occurred.` });
                case 'StripeInvalidRequestError':
                    return res.status(500).json({ 'status': false, 'message': 'An invalid request occurred.' });
                default:
                    return res.status(500).json({ 'status': false, 'message': error.message });
            }
        }
    }

    static async getDashboard(req, res) {
        try {
            const UserId = req.userTokenDetails.user_id;

            let timezone = req.user.timezone || "Europe/Paris";
            var checkBooking = await BookingModel.findOne({ client_bookid: new mongoose.Types.ObjectId(UserId), paymentStatus: 1 }, 'consultant_bookid client_bookid orderId amount fees book_date book_time InvoicNumber', { sort: { book_date: -1 } });
            var nextAppointment = null;

            if (checkBooking) {
                const basicDetails = await ConsultantRegistrationModel.aggregate([
                    { $match: { _id: checkBooking.consultant_bookid } },
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
                                        as: "language",
                                    },
                                },
                                { $project: { _id: 0, profession: 1, year_of_experience: 1, language: { $arrayElemAt: ["$language.name", 0] } } }
                            ],
                            as: "other",
                        },
                    },
                    {
                        $project: {
                            title: 1, timezone: 1, unique_code: 1, given_name: 1, family_name: 1, gender: 1, DOB: 1, contact_number_whatapp: 1, verified_status: 1, active_status: 1,
                            profile_img: { $concat: [process.env.BASEURL, { $arrayElemAt: ["$ProfileAndKeyword.profile_img", 0] }] },
                            other: { $arrayElemAt: ["$other", 0] },
                        }
                    },
                ]);

                var lastConnect = await BookingModel.findOne({
                    consultant_bookid: checkBooking.consultant_bookid,
                    client_bookid: checkBooking.client_bookid,
                    book_date: { $lt: new Date() },
                    paymentStatus: 1
                }, 'book_date', { sort: { book_date: -1 } });

                var startHour = Utils.myMoment().startOf('hour');
                var endHour = Utils.myMoment().endOf('hour');

                nextAppointment = {
                    _id: checkBooking._id,
                    consultant_bookid: checkBooking.consultant_bookid,
                    client_bookid: checkBooking.client_bookid,
                    fees: checkBooking.fees,
                    book_date: Utils.myMoment(checkBooking.book_date, timezone).format('ll'),
                    book_time: Utils.myMoment(checkBooking.book_date, timezone).format('LT | z'),
                    orderId: checkBooking.orderId,
                    InvoicNumber: checkBooking.InvoicNumber,
                    consultant_title: basicDetails?.[0]?.title,
                    consultant_unique_code: basicDetails?.[0]?.unique_code,
                    consultant_family_name: basicDetails?.[0]?.family_name,
                    consultant_given_name: basicDetails?.[0]?.given_name,
                    consultant_gender: basicDetails?.[0]?.gender,
                    consultant_DOB: basicDetails?.[0]?.DOB,
                    consultant_email: basicDetails?.[0]?.email,
                    consultant_contact_number: basicDetails?.[0]?.contact_number,
                    consultant_profession: basicDetails?.[0]?.other?.profession,
                    consultant_year_of_experience: basicDetails?.[0]?.other?.year_of_experience,
                    consultant_language: basicDetails?.[0]?.other?.language,
                    consultant_profile_img: basicDetails?.[0]?.profile_img,
                    is_live_chat: Utils.myMoment(checkBooking.book_date).isBetween(startHour, endHour, null, '[]'),
                    last_connect: lastConnect ? Utils.myMoment(lastConnect.book_date, timezone).format('lll | z') : null
                }
            }

            res.json({ 'status': true, 'message': 'Success', data: { user: req.user, next_appointment: nextAppointment } });
        } catch (error) {
            res.json({ 'status': false, 'message': error.message });
        }
    }

    static async CreatePaymentPaypal(req, res) {
        try {

            const { consultant_id, bookingDate } = req.body;

            const consultant = await ConsultantRegistrationModel.findOne({ _id: new mongoose.Types.ObjectId(consultant_id) });
            if (!consultant) {
                return res.status(404).json({ 'status': false, 'message': "Consultant Details not Valid..!!" });
            }

            const feeData = await ConsultantFeesDetails.findOne({ ConsultantID: new mongoose.Types.ObjectId(consultant_id) });
            if (!feeData) {
                return res.status(422).json({ 'status': false, 'message': "Consultant Details not Valid..!!" });
            }

            if (!bookingDate || Utils.myMoment(bookingDate, consultant.timezone) === null) {
                return res.status(422).json({ 'status': false, 'message': "Please Provide valid booking date..!!" });
            }

            var bookDate = Utils.myMoment(bookingDate, consultant.timezone);

            const checkExist = await BookingModel.findOne({ client_bookid: req.userTokenDetails.user_id, book_date: bookDate, paymentStatus: 1 });
            if (checkExist) {
                return res.status(404).json({ 'status': false, 'message': "Consultant already have appointment at selected Time slot, Please choose other time slot.!!" });
            }

            const UserCount = await BookingModel.find().count()
            const paddedCounter = UserCount.toString().padStart(7, '0');
            const InvoicNumber = `INV${paddedCounter}`
            const orderId = `ORD${paddedCounter}`
            const amount = feeData?.fees;

            let request = new paypal.orders.OrdersCreateRequest();
            request.requestBody({
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "EUR",
                            value: amount
                        }
                    }
                ]
            });

            // your client gets a response with the order id
            const response = await client.execute(request);

            const orderID = response.result.id;
            const record = await BookingModel.create({
                consultant_bookid: consultant_id,
                client_bookid: req.userTokenDetails.user_id,
                amount: amount,
                fees: amount,
                InvoicNumber,
                orderId,
                book_date: bookDate.toISOString(),
                book_time: bookDate.format('hh:mm:ss'),
                paymentId: null,
                paymentStatus: 0,
                clientSecret: orderID,
                created_at: Date.now(),
                updated_at: Date.now(),
            });

            return res.send({
                orderID,
                clientName: req.userTokenDetails?.unique_code,
                clientEmail: req.userTokenDetails?.email_id,
                paymentRecord: record._id,
            });

        } catch (error) {
            return res.status(500).json({ 'status': false, 'message': error.message });
        }
    }

    static async updatePaymentPaypal(req, res) {
        try {

            const { orderID, payerID, } = req.body  // paymentID, facilitatorAccessToken, paymentSource
            let request = new paypal.orders.OrdersCaptureRequest(orderID);
            request.requestBody({});

            // Call API with your client and get a response for your call
            let response = await client.execute(request);

            let { id, status } = response.result;

            const tranStatus = status === 'COMPLETED';

            let message = tranStatus ? "Payment Successfully..!!" : "Payment Failed..!!";
            let updatedData = await BookingModel.findOneAndUpdate({ client_bookid: req.userTokenDetails.user_id, clientSecret: id }, {
                paymentId: payerID,
                paymentStatus: tranStatus ? 1 : 2,
                updated_at: Date.now(),
            }, { new: true });

            if (tranStatus) {
                const consultant = await ConsultantRegistrationModel.findOne({ _id: updatedData.consultant_bookid });
                const ClientData = await ClientRegistrationModel.findById(req.user._id).populate([{ path: 'country_of_residence', select: 'name' }, { path: 'city', select: 'name' }])
                await ClientBookingController.mailInvoice(updatedData, ClientData, consultant)
            }

            return res.status(200).json({ status: tranStatus, message, data: response.result });
        } catch (error) {
            return res.status(500).json({ 'status': false, 'message': error.message });
        }
    }
}