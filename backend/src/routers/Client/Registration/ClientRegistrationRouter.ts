import { Router } from "express";
import { ClientRegistrationController } from "../../../controller/Client/Registration/ClientRegistrationController";
import { ClientRegistrationValidations } from "../../../validators/Client/Registration/ClientRegistrationValidations";
import { GlobleMiddleware } from "../../../Middleware/GlobalMiddleware";
import { Utils } from "../../../utils/utils";
import { ComApiController } from "../../../controller/ComApiController";
import { ClientBookingController } from "../../../controller/Client/Registration/ClientBookingController";
import { ComplaintValidator } from "../../../validators/ComplaintValidator";

export class ClientRegistrationRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.getCommanApiRouter();
        this.postCommanApiRouter();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/get-client-basic-details', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.getClientalDetails);
        this.router.get('/get-booking-details', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.getBooking);
        this.router.get('/get-my-transtions-history', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.getPaymentHistory);
    }

    getCommanApiRouter() {
        this.router.get('/get-country', ComApiController.getCountry);
        this.router.get('/get-search-keys', ComApiController.getSearchKeys);
        this.router.get('/get-languages', ComApiController.getLanguages);
        this.router.get('/get-nationality', ComApiController.getNationality);
        this.router.get('/get-specialization', ComApiController.getSpecialization);
        this.router.get('/get-disorders', ComApiController.getDisorders);
        this.router.get('/get-quote', ComApiController.getQuote);
        this.router.get('/get-blogs', ComApiController.getBlogs);
        this.router.get('/get-single-blog', ComApiController.getSingleBlogs);
        this.router.get('/consultant-time-slot-details', ComApiController.getConsultantDetails);
        this.router.get('/consultant-time-slot-two-details', ComApiController.getConsultantTwoDetails);
        this.router.get('/get-consultant-filter', ComApiController.getFilterDetails);
        this.router.get('/get-consultant-list', ComApiController.getConsultantList);
        this.router.get('/get-single-consultant-record', ComApiController.getSingleConsultant);
        this.router.get('/get-single-consultant-record-2', ComApiController.getSingleConsultant2);
        this.router.get('/autocomplete', ComApiController.getAutocompleteDetails);
        this.router.get('/get-auther', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.getAuthor);
        this.router.get('/favourite-blog', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.FavouriteBlogRecord);
        this.router.get('/get-favourite-blog', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.favouriteBlog);
        this.router.get('/get-complaint-raised-by-me', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.getComplaintRaisedByClient);
        this.router.get('/get-complaint-against-me', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.getComplaintagainstByClient);
        this.router.get('/get-complaint-type', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.getComplaintType);
        this.router.get('/my-profile', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.getClientProfile);
        this.router.get('/get-general-details', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.getSingleClient);
        this.router.get('/get-single-note', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.getSingleNote);
        this.router.get('/get-digital-product', ComApiController.getDigitalProduct);
        this.router.get('/privacy-policy', ComApiController.getPrivacyPolicy);
        this.router.get('/term-and-conditions', ComApiController.getTermConditions);

        this.router.get('/get-dashboard', GlobleMiddleware.checkClient, ClientBookingController.getDashboard);
        this.router.get('/get-zego-token/:room', GlobleMiddleware.checkClient, ComApiController.getZegoToken); //
    }

    postRouters() {
        this.router.post('/save-client', ClientRegistrationController.saveClient);
        this.router.post('/sign-up', ClientRegistrationValidations.Registrationstore(), GlobleMiddleware.checkError, ClientRegistrationController.signUp);
        this.router.post('/edit-sign-up', ClientRegistrationValidations.RegistrationEdit(), GlobleMiddleware.checkError, ClientRegistrationController.editSignUp);
        this.router.post('/client-basic-details', new Utils().profile_image.single('profile_image'), ClientRegistrationValidations.BasicDetailStore(), GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ClientRegistrationController.clientadditionalDetails);
        this.router.post('/login', ClientRegistrationValidations.login(), GlobleMiddleware.checkError, ClientRegistrationController.signIn);
        this.router.post('/setting/forgot-password', ClientRegistrationValidations.sendResetPasswordEmail(), GlobleMiddleware.checkError, ClientRegistrationController.sendResetPasswordEmail);
        this.router.post('/setting/change-password', GlobleMiddleware.checkClient, ClientRegistrationValidations.changePassword(), GlobleMiddleware.checkError, ClientRegistrationController.changePassword);
        this.router.post('/setting/reset-password', ClientRegistrationValidations.resetPassword(), GlobleMiddleware.checkError, ClientRegistrationController.resetPassword);
        this.router.post('/send-mobile-otp', ClientRegistrationController.sendMobileOTP);
        this.router.post('/send-email-otp', ClientRegistrationController.sendEmailOTP);
        this.router.post('/doc-health-assessment', new Utils().profile_image.single('document'), GlobleMiddleware.checkClient, ClientRegistrationController.healthAssessmentDoc);
        this.router.post('/doc-consent-form', new Utils().profile_image.single('document'), GlobleMiddleware.checkClient, ClientRegistrationController.consentFormDoc);
        this.router.post('/contact-us', ClientRegistrationValidations.contactUs(), GlobleMiddleware.checkError, ComApiController.contactUs);

    }

    postCommanApiRouter() {
        this.router.post('/create-payment-intent', GlobleMiddleware.checkClient, ClientBookingController.CreatePayment);
        this.router.post('/create-payment-intent-paypal', GlobleMiddleware.checkClient, ClientBookingController.CreatePaymentPaypal);
        this.router.post('/send-complaint', GlobleMiddleware.checkClient, new Utils().blog.single('attachment'), ComplaintValidator.store(), GlobleMiddleware.checkError, ComApiController.ComplaintByClient);
        this.router.post('/favourite', GlobleMiddleware.checkClient, GlobleMiddleware.checkError, ComApiController.ClientFavouriteBlog);
    }

    patchRouters() {
        this.router.put('/update-payment-intent', GlobleMiddleware.checkClient, ClientBookingController.updatePayment);
        this.router.put('/update-payment-intent-paypal', GlobleMiddleware.checkClient, ClientBookingController.updatePaymentPaypal);
    }

    deleteRouters() { }
}

export default new ClientRegistrationRouter().router;