import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { KeywordValidators } from "../validators/KeywordValidators";
import { KeywordController } from "../controller/KeywordController";

export class KeywordRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', GlobleMiddleware.checkAdmin, KeywordController.getAllService);
        this.router.get('/get-trashed-record', GlobleMiddleware.checkAdmin, KeywordController.getDataWithTrash);
        this.router.get('/get-record-by-id', GlobleMiddleware.checkAdmin, KeywordController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', GlobleMiddleware.checkAdmin, KeywordValidators.storeService(), GlobleMiddleware.checkError, KeywordController.storeService);
        this.router.post('/status', KeywordValidators.activeService(), GlobleMiddleware.checkError, KeywordController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', GlobleMiddleware.checkAdmin, KeywordController.editService);
        this.router.patch('/restore', KeywordController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkAdmin, KeywordValidators.deleteService(), GlobleMiddleware.checkError, KeywordController.deleteService);
        this.router.delete('/multi-delete', KeywordController.multiDelteService);

        this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, KeywordValidators.tempDeleteService(), GlobleMiddleware.checkError, KeywordController.tempDeleteService);
        this.router.delete('/temp-multi-delete', GlobleMiddleware.checkAdmin, KeywordController.tempMultiDelteService);
    }
}

export default new KeywordRouter().router;