import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { DisordersValidators } from "../validators/DisordersValidators";
import { DisordersController } from "../controller/DisordersController";

export class DisordersRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, DisordersController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, DisordersController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, DisordersController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, DisordersValidators.storeService(), GlobleMiddleware.checkError, DisordersController.storeService);
        this.router.post('/status', DisordersValidators.activeService(), GlobleMiddleware.checkError, DisordersController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, DisordersController.editService);
        this.router.patch('/restore', DisordersController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, DisordersValidators.deleteService(), GlobleMiddleware.checkError, DisordersController.deleteService);
        this.router.delete('/multi-delete', DisordersController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, DisordersValidators.tempDeleteService(), GlobleMiddleware.checkError, DisordersController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, DisordersController.tempMultiDelteService);
    }
}

export default new DisordersRouter().router;