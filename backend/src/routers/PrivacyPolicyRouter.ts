import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { PrivacyPolicyValidator } from "../validators/PrivcayPolicyValidators";
import { PrivacyPolicyController } from "../controller/PrivacyPolicyController";

export class PrivacyPolicyRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', PrivacyPolicyController.index);
        this.router.get('/get-trashed-record', PrivacyPolicyController.getDataWIthTrash);
        this.router.get('/get-record-by-id', PrivacyPolicyController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', PrivacyPolicyValidator.store(), GlobleMiddleware.checkError, PrivacyPolicyController.store);
        this.router.post('/status', PrivacyPolicyValidator.activeRecord(), GlobleMiddleware.checkError, PrivacyPolicyController.activeRecord);
    }

    patchRouters() {
        // this.router.patch('/edit',  PrivacyPolicyValidator.store(), PrivacyPolicyController.edit);
        this.router.patch('/restore', PrivacyPolicyController.restoreRecord);
    }

    deleteRouters() {
        // this.router.delete('/delete', PrivacyPolicyValidator.delete(), GlobleMiddleware.checkError, PrivacyPolicyController.delete);
        // this.router.delete('/multi-delete', PrivacyPolicyController.multiDelte );
        this.router.delete('/temp-delete', PrivacyPolicyValidator.tempDelete(), GlobleMiddleware.checkError, PrivacyPolicyController.tempDelete);
        this.router.delete('/temp-multi-delete', PrivacyPolicyController.tempMultiDelte);
    }
}
export default new PrivacyPolicyRouter().router;