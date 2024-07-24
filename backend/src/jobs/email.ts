import * as crondata from 'node-cron';
import { blueMailer } from '../utils/blueMailer';
import mongoose from 'mongoose';
import ConsultantRegistrationModel from '../model/Consultant/Registration/ConsultantRegistrationModel';
import ConsultantBasicDetails from '../model/Consultant/Registration/ConsultantBasicDetails';
import ConsultantAddressDetailsModel from '../model/Consultant/Registration/ConsultantAddressDetailsModel';
import ConsultantBankDetailsModel from '../model/Consultant/Registration/ConsultantBankDetailsModel';
import ConsultantCertificateModel from '../model/Consultant/Registration/ConsultantCertificateModel';
import ConsultantProfileAndKeywordDetailsModel from '../model/Consultant/Registration/ConsultantProfileAndKeywordDetailsModel';
import ConsultantEducationDetailsModel from '../model/Consultant/Registration/ConsultantEducationDetailsModel';
import { MailTemplate } from '../utils/MailTemplate';
import BookingModel from '../model/Client/Registration/BookingModel';

export class Email {

    static async runEmailJobs() {
        Email.CompleteProfile()
        // Email.UpCommingAppointment()
    }

    static async CompleteProfile() {

        crondata.schedule('01 01 02 * *', async () => {
            try {
                let ConsultantList = await ConsultantRegistrationModel.find({});
                for (let i = 0; i < ConsultantList.length; i++) {
                    // console.log(ConsultantList.length)
                    let BasicDetails = await ConsultantBasicDetails.findOne({ 'consultantUserId': new mongoose.Types.ObjectId(ConsultantList[i]._id) }).count();
                    let AddressDetails = await ConsultantAddressDetailsModel.findOne({ 'consultant_address': new mongoose.Types.ObjectId(ConsultantList[i]._id) }).count();
                    let BankDetails = await ConsultantBankDetailsModel.findOne({ 'consultant_bankUser': new mongoose.Types.ObjectId(ConsultantList[i]._id) }).count();
                    let CertificateDetail = await ConsultantCertificateModel.findOne({ 'userCertificate': new mongoose.Types.ObjectId(ConsultantList[i]._id) }).count();
                    let ProfileDetail = await ConsultantProfileAndKeywordDetailsModel.findOne({ 'consultant_profileid': new mongoose.Types.ObjectId(ConsultantList[i]._id) }).count();
                    let EducationDetails = await ConsultantEducationDetailsModel.findOne({ 'userEducation': new mongoose.Types.ObjectId(ConsultantList[i]._id) }).count();

                    if (BasicDetails == 0 && AddressDetails == 0 && BankDetails == 0 && CertificateDetail == 0 && ProfileDetail == 0 && EducationDetails == 0) {

                        const Name = ConsultantList[i].given_name;
                        const Contant = `<p>Your profile is currently under review. To complete your registration with VhealTHY, kindly submit the necessary documents as per our requirements stipulated in the consultancy contract (LINK or attached) </p>Thank you for your cooperation! 🌿<p></p>`;
                        await blueMailer.sendEmail({
                            to: ConsultantList[i].email,
                            subject: 'Profile Review Reminder - VhealTHY',
                            html: await MailTemplate.webTemplate({ Name, Contant }),
                        })
                    }
                }
            }
            catch (e) {
                console.log(e.message)
            }
        })
    }


    // static async UpCommingAppointment(){

    //     // Example retrieve IP from request
    //    const getIp = dns.lookup('www.vhealthy.fr',  
    //     (err, addresses, family) => { 

    //         // Print the address found of user 
    //         console.log('addresses:', addresses); 
    //       return addresses;
    //         // Print the family found of user   
    //         console.log('family:', family); 
    //     }); 

    //     console.log(getIp)

    //     satelize.satelize({ip:'46.19.37.108'}, function(err, payload) {
    //         console.log(payload)
    //       });
    //       console.log(satelize)
    //     var finalMatchData = [];
    //     crondata.schedule('01 01-59 * * * *', async () => 
    //     { 
    //         try {
    //                 const  getBooking = await BookingModel.find()
    //                 for (let i = 0; i < getBooking.length; i++) 
    //                 {   
    //                         getBooking[i].book_date;
    //                         console.log(getBooking[i].book_date)
    //                         // moment.tz.setDefault('UTC');
    //                         const currentDateInGMT = moment();
    //                         console.log(currentDateInGMT)
    //                          const indiaDateTime = currentDateInGMT.tz('Asia/Kolkata');
    //                         console.log(indiaDateTime)
    //                         const ConvertUTC = indiaDateTime.utc(indiaDateTime);
    //                         console.log(ConvertUTC)

    //                         // const nowInUTC = currentDateInGMT.format('YYYY-MM-DD HH:mm:ss'); // This will give you the current date and time in UTC
    //                         // const gmtDateTime = moment.utc(nowInUTC);
    //                         // // Convert to Asia/Kolkata timezone
    //                         // // Europe/Lisbon
    //                         // const indiaDateTime = gmtDateTime.tz('Asia/Kolkata');
    //                         // const UTCZero = gmtDateTime.tz('Europe/Lisbon');

    //                         // const formattedDateTime = indiaDateTime.format('YYYY-MM-DD HH:mm:ss');
    //                         // for (let i = 0; i < 15; i++) {
    //                         //     const nextDate = currentDateInGMT.clone().add(i, 'days');
    //                         //     next15Dates.push(nextDate.format('YYYY-MM-DD HH:mm:ss'));
    //                         // }


    //                 }
    //         }
    //         catch (e) 
    //         {
    //            console.log(e.message)
    //         }
    //     })
    // }

    static async UpCommingAppointment() {

        crondata.schedule('35 01-59 * * * *', async () => {
            try {
                const getBooking = await BookingModel.find()
                for (let i = 0; i < getBooking.length; i++) {

                    console.log(new Date('2023-11-11 09:00 AM'))
                    // getBooking[i].book_date;
                    // console.log(getBooking[i].book_date)
                    // console.log(getBooking[i].book_time)
                    console.log(getBooking[i].book_date + ' ' + getBooking[i].book_time)
                    // moment.tz.setDefault('UTC');
                    //    const currentDateInGMT = moment();
                    //    console.log(currentDateInGMT)
                    // console.log(currentDateInGMT)
                    // const indiaDateTime = currentDateInGMT.tz('Asia/Kolkata');
                    // console.log(indiaDateTime)
                    // console.log(indiaDateTime)
                    // const ConvertUTC = getBooking[i].book_date.format('YYYY-MM-DD HH:mm:ss');
                    // console.log(ConvertUTC)
                    // const indiaDateTime = ConvertUTC.tz('Asia/Kolkata');
                    // console.log(indiaDateTime)

                    // const nowInUTC = currentDateInGMT.format('YYYY-MM-DD HH:mm:ss'); // This will give you the current date and time in UTC
                    // const gmtDateTime = moment.utc(nowInUTC);
                    // // Convert to Asia/Kolkata timezone
                    // // Europe/Lisbon
                    // const indiaDateTime = gmtDateTime.tz('Asia/Kolkata');
                    // const UTCZero = gmtDateTime.tz('Europe/Lisbon');

                    // const formattedDateTime = indiaDateTime.format('YYYY-MM-DD HH:mm:ss');
                    // for (let i = 0; i < 15; i++) {
                    //     const nextDate = currentDateInGMT.clone().add(i, 'days');
                    //     next15Dates.push(nextDate.format('YYYY-MM-DD HH:mm:ss'));
                    // }


                }
            }
            catch (e) {
                console.log(e.message)
            }
        })
    }
}