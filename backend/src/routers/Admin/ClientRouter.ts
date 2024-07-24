import { Router } from "express";
import { GlobleMiddleware } from "../../Middleware/GlobalMiddleware";
import { ConsultantController } from "../../controller/Admin/ConsultantController";
import { CommanValidator } from "../../validators/Admin/CommanValidator";

export class ClientRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/view', ConsultantController.getClient);
        this.router.get('/get-trash-view', ConsultantController.getTrashClient);
        this.router.get('/get-client-single-record', CommanValidator.getConsulatantUser(), GlobleMiddleware.checkError, ConsultantController.getSingleClient);
        this.router.get('/get-client-booking-details', CommanValidator.getConsulatantUser(), GlobleMiddleware.checkError, ConsultantController.getClientBooking);
    }

    postRouters() {
        this.router.post('/verify', GlobleMiddleware.checkAdmin, GlobleMiddleware.checkError, ConsultantController.verifyClient);
        this.router.post('/status', GlobleMiddleware.checkAdmin, GlobleMiddleware.checkError, ConsultantController.ActiveClient);
    }

    patchRouters() {
        // this.router.patch('/restore',  ConsultantController.restoreService); 
    }

    deleteRouters() {
        this.router.delete('/temp-delete', GlobleMiddleware.checkError, ConsultantController.ClientTemporyDelete);
        this.router.delete('/delete', GlobleMiddleware.checkError, ConsultantController.DeleteClientAccount);
    }
}

export default new ClientRouter().router;