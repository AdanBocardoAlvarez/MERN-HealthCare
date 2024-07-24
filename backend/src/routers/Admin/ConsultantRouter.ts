import { Router } from "express";
import { GlobleMiddleware } from "../../Middleware/GlobalMiddleware";
import { ConsultantController } from "../../controller/Admin/ConsultantController";
import { CommanValidator } from "../../validators/Admin/CommanValidator";

export class ConsultantRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/view', ConsultantController.getConsultant);
        this.router.get('/get-consultant-single-record', CommanValidator.getConsulatantUser(), GlobleMiddleware.checkError, ConsultantController.getSingleConsultant);
        this.router.get('/get-consultant-booking-details', CommanValidator.getConsulatantUser(), GlobleMiddleware.checkError, ConsultantController.getConsultantBooking);

        // Client Route End
        this.router.get('/get-fees', GlobleMiddleware.checkError, ConsultantController.getConsultantFees);
        this.router.get('/get-session-time', GlobleMiddleware.checkError, ConsultantController.getConsultantSessionTime);
    }

    postRouters() {
        this.router.post('/verify', CommanValidator.getConsulatantVerify(), GlobleMiddleware.checkError, ConsultantController.verifyConsultant);
        this.router.post('/status', CommanValidator.getConsulatantStatus(), GlobleMiddleware.checkError, ConsultantController.ActiveConsultant);
        this.router.post('/add-fees', CommanValidator.getConsulatantFees(), GlobleMiddleware.checkError, ConsultantController.addConsultantFees);
        this.router.post('/add-session-time', CommanValidator.getConsulatantSessionTime(), GlobleMiddleware.checkError, ConsultantController.addConsultantSessionTime);
    }

    patchRouters() {
        // this.router.patch('/restore',  ConsultantController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, GlobleMiddleware.checkError, ConsultantController.ConsultantTemporyDelete);
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, GlobleMiddleware.checkError, ConsultantController.DeleteConsultantAccount);
    }
}

export default new ConsultantRouter().router;