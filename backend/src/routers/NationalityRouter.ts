import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { NationalityValidators } from "../validators/NationalityValidators";
import { NationalityController } from "../controller/NationalityController";

export class NationalityRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, NationalityController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, NationalityController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, NationalityController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, NationalityValidators.storeService(), GlobleMiddleware.checkError, NationalityController.storeService);
        this.router.post('/status', NationalityValidators.activeService(), GlobleMiddleware.checkError, NationalityController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, NationalityController.editService);
        this.router.patch('/restore', NationalityController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, NationalityValidators.deleteService(), GlobleMiddleware.checkError, NationalityController.deleteService);
        this.router.delete('/multi-delete', NationalityController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, NationalityValidators.tempDeleteService(), GlobleMiddleware.checkError, NationalityController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, NationalityController.tempMultiDelteService);
    }
}

export default new NationalityRouter().router;