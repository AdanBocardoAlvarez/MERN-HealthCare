import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { QuoteValidator } from "../validators/QuoteValidators";
import { QuoteController } from "../controller/QuoteController";

export class QuoteRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', QuoteController.index);
        this.router.get('/get-trashed-record', QuoteController.getDataWIthTrash);
        this.router.get('/get-record-by-id', QuoteController.getRecordById);
        this.router.get('/get-author', QuoteController.getAuthor);
    }

    postRouters() {
        this.router.post('/store', QuoteValidator.store(), GlobleMiddleware.checkError, QuoteController.store);
        this.router.post('/status', QuoteValidator.activeRecord(), GlobleMiddleware.checkError, QuoteController.activeRecord);
    }

    patchRouters() {
        // 
        this.router.patch('/edit', QuoteValidator.store(), QuoteController.edit);
        this.router.patch('/restore', QuoteController.restoreRecord);
    }

    deleteRouters() {
        this.router.delete('/delete', QuoteValidator.delete(), GlobleMiddleware.checkError, QuoteController.delete);
        this.router.delete('/multi-delete', QuoteController.multiDelte);

        this.router.delete('/temp-delete', QuoteValidator.tempDelete(), GlobleMiddleware.checkError, QuoteController.tempDelete);
        this.router.delete('/temp-multi-delete', QuoteController.tempMultiDelte);
    }
}

export default new QuoteRouter().router;