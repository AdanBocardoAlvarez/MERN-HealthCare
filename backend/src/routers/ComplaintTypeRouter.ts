import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { ComplaintTypeValidators } from "../validators/ComplaintTypeValidator";
import { ComplaintTypeController } from "../controller/ComplaintTypeController";

export class ComplaintTypeRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, ComplaintTypeController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, ComplaintTypeController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, ComplaintTypeController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, ComplaintTypeValidators.storeService(), GlobleMiddleware.checkError, ComplaintTypeController.storeService);
        this.router.post('/status', ComplaintTypeValidators.activeService(), GlobleMiddleware.checkError, ComplaintTypeController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, ComplaintTypeController.editService);
        this.router.patch('/restore', ComplaintTypeController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, ComplaintTypeValidators.deleteService(), GlobleMiddleware.checkError, ComplaintTypeController.deleteService);
        this.router.delete('/multi-delete', ComplaintTypeController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, ComplaintTypeValidators.tempDeleteService(), GlobleMiddleware.checkError, ComplaintTypeController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, ComplaintTypeController.tempMultiDelteService);
    }
}

export default new ComplaintTypeRouter().router;