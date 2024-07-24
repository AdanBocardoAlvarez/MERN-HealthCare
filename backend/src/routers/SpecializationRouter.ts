import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { SpecializationValidators } from "../validators/SpecializationValidators";
import { SpecializationController } from "../controller/SpecializationController";

export class SpecializationRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, SpecializationController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, SpecializationController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, SpecializationController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, SpecializationValidators.storeService(), GlobleMiddleware.checkError, SpecializationController.storeService);
        this.router.post('/status', SpecializationValidators.activeService(), GlobleMiddleware.checkError, SpecializationController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, SpecializationController.editService);
        this.router.patch('/restore', SpecializationController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, SpecializationValidators.deleteService(), GlobleMiddleware.checkError, SpecializationController.deleteService);
        this.router.delete('/multi-delete', SpecializationController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, SpecializationValidators.tempDeleteService(), GlobleMiddleware.checkError, SpecializationController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, SpecializationController.tempMultiDelteService);
    }
}

export default new SpecializationRouter().router;