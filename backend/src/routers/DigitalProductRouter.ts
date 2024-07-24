import { Router } from "express";
import { Utils } from "../utils/utils";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { DigitalProductValidator } from "../validators/DigitalProductValidator";
import { DigitalProductController } from "../controller/DigitalProductController";

export class DigitalProductRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', DigitalProductController.index);
        this.router.get('/get-trashed-record', DigitalProductController.getDataWIthTrash);
        this.router.get('/get-record-by-id', DigitalProductController.getRecordById);
        this.router.get('/get-author', DigitalProductController.getAuthor);
    }

    postRouters() {
        this.router.post('/store', new Utils().digital_product.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), DigitalProductValidator.store(),
            GlobleMiddleware.checkError, DigitalProductController.store);
        this.router.post('/status', DigitalProductValidator.activeRecord(), GlobleMiddleware.checkError, DigitalProductController.activeRecord);
    }


    patchRouters() {
        this.router.patch('/edit', new Utils().digital_product.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),
            DigitalProductValidator.edit(), GlobleMiddleware.checkError,
            DigitalProductController.edit);
        this.router.patch('/restore', DigitalProductController.restoreRecord);
    }

    deleteRouters() {
        this.router.delete('/delete', DigitalProductValidator.delete(), GlobleMiddleware.checkError, DigitalProductController.delete);
        this.router.delete('/multi-delete', DigitalProductController.multiDelte);
        this.router.delete('/temp-delete', DigitalProductValidator.tempDelete(), GlobleMiddleware.checkError, DigitalProductController.tempDelete);
        this.router.delete('/temp-multi-delete', DigitalProductController.tempMultiDelte);
    }
}

export default new DigitalProductRouter().router;