import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { ObjectivesValidators } from "../validators/ObjectivesValidators";
import { ObjectivesController } from "../controller/ObjectivesController";

export class ObjectivesRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, ObjectivesController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, ObjectivesController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, ObjectivesController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, ObjectivesValidators.storeService(), GlobleMiddleware.checkError, ObjectivesController.storeService);
        this.router.post('/status', ObjectivesValidators.activeService(), GlobleMiddleware.checkError, ObjectivesController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, ObjectivesController.editService);
        this.router.patch('/restore', ObjectivesController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, ObjectivesValidators.deleteService(), GlobleMiddleware.checkError, ObjectivesController.deleteService);
        this.router.delete('/multi-delete', ObjectivesController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, ObjectivesValidators.tempDeleteService(), GlobleMiddleware.checkError, ObjectivesController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, ObjectivesController.tempMultiDelteService);
    }
}

export default new ObjectivesRouter().router;