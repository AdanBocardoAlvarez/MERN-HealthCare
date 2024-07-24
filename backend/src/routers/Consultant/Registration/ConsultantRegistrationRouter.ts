import { Router } from "express";
import { ConsultantRegistrationController } from "../../../controller/Consultant/Registration/ConsultantRegistrationController";
import { ConsultantRegistrationValidations } from "../../../validators/Consultant/Registration/ConsultantRegistrationValidations";
import { GlobleMiddleware } from "../../../Middleware/GlobalMiddleware";
import { Utils } from "../../../utils/utils";
import { ComApiController } from "../../../controller/ComApiController";
import { ConsultantCommanController } from "../../../controller/Consultant/Registration/ConsultantBookingController";
import { ComplaintValidator } from "../../../validators/ComplaintValidator";

export class ConsultantRegistrationRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.getCommanApiRouter();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/my-profile', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.consultantProfileDetails);
        this.router.get('/get-consultant-basic-details', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getConsultantBasicDetails);
        this.router.get('/get-consultant-bank-details', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getConsultantBankDetails);
        this.router.get('/get-consultant-address-details', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getConsultantAddressDetails);
        this.router.get('/get-consultant-education-details', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getConsultantEducationDetails);
        this.router.get('/get-consultant-education-list', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getConsultantEducationList);
        this.router.get('/get-all-consultant-certificates', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.GetAllCertificateDetails);
        this.router.get('/get-single-consultant-certificates', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.GetSingleCertificateDetails);
    }

    getCommanApiRouter() {
        this.router.get('/get-country', ComApiController.getCountry);
        this.router.get('/get-city', ComApiController.getCity);
        this.router.get('/get-languages', ComApiController.getLanguages);
        this.router.get('/get-nationality', ComApiController.getNationality);
        this.router.get('/get-specialization', ComApiController.getSpecialization);
        this.router.get('/get-disorders', ComApiController.getDisorders);
        this.router.get('/get-keywords', ComApiController.getKeywords);
        this.router.get('/get-objectives/', ComApiController.getObjective)
        this.router.get('/get-client-notes-by-id', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ComApiController.getNotesForClient)
        this.router.get('/get-client-list', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ComApiController.getClientList);
        this.router.get('/get-complaint-raised-by-me', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ComApiController.getComplaintRaisedByConsultant);
        this.router.get('/get-complaint-against-me', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ComApiController.getComplaintagainstByConsultant);
        this.router.get('/get-complaint-type', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ComApiController.getComplaintType);
        this.router.get('/get-profile-keywords-details', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getProfileAndKeywordsDetails);
        this.router.get('/get-all-note-for-client', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getAllNoteForClient);
        this.router.get('/get-single-note', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.getSingleNote);


        this.router.get('/get-my-booking', GlobleMiddleware.checkConsultant, ConsultantCommanController.getBookingDetails);
        this.router.get('/get-dashboard', GlobleMiddleware.checkConsultant, ConsultantCommanController.getDashboard);
        this.router.get('/get-zego-token/:room', GlobleMiddleware.checkConsultant, ComApiController.getZegoToken);
    }

    postRouters() {
        // first Step by user sign up
        this.router.post('/sign-up', ConsultantRegistrationValidations.Registrationstore(), GlobleMiddleware.checkError, ConsultantRegistrationController.signUp);

        this.router.post('/consultant-basic-details', new Utils().criminal_record.fields([{ name: 'id_number_attachment', maxCount: 1 }, { name: 'criminal_record_attachment', maxCount: 1 }]), ConsultantRegistrationValidations.RegistrationBasicDetailStore(),
            GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.consultantBasicDetails);



        this.router.post('/add-consultant-education',
            new Utils().educationDetails.single('attachment'),
            GlobleMiddleware.checkConsultant,
            ConsultantRegistrationController.addEducation);

        this.router.post('/consultant-document',
            new Utils().consultant_profile.single('document'),
            GlobleMiddleware.checkConsultant,
            ConsultantRegistrationController.documentUpload);


        this.router.post('/consultant-profile-keywords-details',
            new Utils().consultant_profile.single('profile_img'),
            ConsultantRegistrationValidations.setUpProfileAndKeywordsDetails(),
            GlobleMiddleware.checkConsultant,
            GlobleMiddleware.checkError,
            ConsultantRegistrationController.setUpProfileAndKeywordsDetails);

        this.router.post('/consultant-bank-details', new Utils().add_bank_information.array('add_bank_information', 1),
            ConsultantRegistrationValidations.RegistrationBankDetailStore(), GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.consultantBankDetails);

        this.router.post('/consultant-address-details', ConsultantRegistrationValidations.RegistrationAddressDetail(), GlobleMiddleware.checkConsultant,
            GlobleMiddleware.checkError, ConsultantRegistrationController.consultantAddressDetails);

        this.router.post('/consultant-education-details', new Utils().educationDetails.single('edu_resume'), ConsultantRegistrationValidations.RegistrationEducationDetailStore(),
            GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError,
            ConsultantRegistrationController.consultantEducationDetails);

        this.router.post('/consultant-certificates', GlobleMiddleware.checkConsultant, new Utils().consultant_certificate.single('certificate_attachment'), GlobleMiddleware.checkError, ConsultantRegistrationController.consultantCertificateDetails);

        this.router.post('/send-complaint', GlobleMiddleware.checkConsultant, new Utils().blog.single('attachment'), ComplaintValidator.store(),
            GlobleMiddleware.checkError, ComApiController.ComplaintByClient);

        this.router.post('/send-mobile-otp', ConsultantRegistrationController.sendMobileOTP);
        this.router.post('/send-email-otp', ConsultantRegistrationController.sendEmailOTP);
        this.router.post('/add-note-for-client', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.addNoteForClient);
        this.router.get('/consultant-time-slot', GlobleMiddleware.checkConsultant, ConsultantRegistrationController.getTimeSlot);
        this.router.post('/consultant-time-slot', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.consultantTimeSlotDetails);
        this.router.post('/consultant-modify-time-slot', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.consultantModifyTimeSlotDetails);
        this.router.post('/consultant-time-slot-two', GlobleMiddleware.checkConsultant, GlobleMiddleware.checkError, ConsultantRegistrationController.consultantTimeSlotDetails2);
        this.router.post('/login', ConsultantRegistrationValidations.login(), GlobleMiddleware.checkError, ConsultantRegistrationController.signIn);
        this.router.post('/setting/change-password', GlobleMiddleware.checkConsultant, ConsultantRegistrationValidations.changePassword(), GlobleMiddleware.checkError, ConsultantRegistrationController.changePassword);
        this.router.post('/setting/forgot-password', GlobleMiddleware.checkError, ConsultantRegistrationController.sendResetPasswordEmail);
        this.router.post('/setting/reset-password', ConsultantRegistrationValidations.resetPassword(), GlobleMiddleware.checkError, ConsultantRegistrationController.resetPassword);
    }
    // ConsultantRegistrationValidations.sendResetPasswordEmail(),

    patchRouters() {
        this.router.patch('/edit-consultant-certificates', GlobleMiddleware.checkConsultant, new Utils().consultant_certificate.array('certificates', 1), GlobleMiddleware.checkError,
            ConsultantRegistrationController.EditCertificateDetails);


        this.router.patch('/edit-consultant-education',
            new Utils().educationDetails.single('attachment'),
            GlobleMiddleware.checkConsultant,
            ConsultantRegistrationController.editEducation);

    }

    deleteRouters() {
        this.router.delete('/delete-consultant-certificates', GlobleMiddleware.checkConsultant, ConsultantRegistrationController.DeleteCertificateDetails);
        this.router.delete('/delete-consultant-education', GlobleMiddleware.checkConsultant, ConsultantRegistrationController.deleteEducation);
    }
}

export default new ConsultantRegistrationRouter().router;