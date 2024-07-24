import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { LanguagesValidators } from "../validators/LanguagesValidators";
import { LanguagesController } from "../controller/LanguagesController";

export class LanguagesRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, LanguagesController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, LanguagesController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, LanguagesController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, LanguagesValidators.storeService(), GlobleMiddleware.checkError, LanguagesController.storeService);
        this.router.post('/status', LanguagesValidators.activeService(), GlobleMiddleware.checkError, LanguagesController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, LanguagesController.editService);
        this.router.patch('/restore', LanguagesController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, LanguagesValidators.deleteService(), GlobleMiddleware.checkError, LanguagesController.deleteService);
        this.router.delete('/multi-delete', LanguagesController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, LanguagesValidators.tempDeleteService(), GlobleMiddleware.checkError, LanguagesController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, LanguagesController.tempMultiDelteService);
    }
}

export default new LanguagesRouter().router;