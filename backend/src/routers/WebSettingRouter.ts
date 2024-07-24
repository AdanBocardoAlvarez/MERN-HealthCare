import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { WebSettingController } from "../controller/Admin/WebSettingController";
import { Utils } from "../utils/utils";

export class WebSettingRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        // this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/get-record', WebSettingController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', new Utils().web_logo.fields([
            { name: 'web_logo', maxCount: 1 },
            { name: 'footer_logo', maxCount: 1 },
            { name: 'email_logo', maxCount: 1 },
            { name: 'fab_icon', maxCount: 1 }
        ]), WebSettingController.storeService);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkError, WebSettingController.deleteService);
    }
}

export default new WebSettingRouter().router;