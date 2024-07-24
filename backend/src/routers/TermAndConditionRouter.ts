import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { TermConditionValidator } from "../validators/TermConditionValidators";
import { TermAndConditionController } from "../controller/TermAndConditionController";

export class TermAndConditionRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', TermAndConditionController.index);
        this.router.get('/get-trashed-record', TermAndConditionController.getDataWIthTrash);
        this.router.get('/get-record-by-id', TermAndConditionController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', TermConditionValidator.store(), GlobleMiddleware.checkError, TermAndConditionController.store);
        this.router.post('/status', TermConditionValidator.activeRecord(), GlobleMiddleware.checkError, TermAndConditionController.activeRecord);
    }

    patchRouters() {
        // this.router.patch('/edit',  TermConditionValidator.store(), TermAndConditionController.edit);
        this.router.patch('/restore', TermAndConditionController.restoreRecord);
    }

    deleteRouters() {
        // this.router.delete('/delete', TermConditionValidator.delete(), GlobleMiddleware.checkError, TermAndConditionController.delete);
        // this.router.delete('/multi-delete', TermAndConditionController.multiDelte );
        this.router.delete('/temp-delete', TermConditionValidator.tempDelete(), GlobleMiddleware.checkError, TermAndConditionController.tempDelete);
        this.router.delete('/temp-multi-delete', TermAndConditionController.tempMultiDelte);
    }
}
export default new TermAndConditionRouter().router;