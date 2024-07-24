import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { SmsEmailSettingController } from "../controller/Admin/SmsEmailSettingController";
export class SmsEmailSettingRouter {
    public router : Router;
    constructor()
    {
        this.router = Router();
        this.postRouters();
        this.getRouters();
        this.patchRouters();
        this.deleteRouters();
    }
    getRouters() {
        this.router.get('/index', SmsEmailSettingController.getAllService);
        this.router.get('/getSmsService', SmsEmailSettingController.getSmsService);
    }

    postRouters()
    {   
        this.router.get('/get-by-id', SmsEmailSettingController.getRecordById);
        this.router.post('/store', SmsEmailSettingController.storeService);
    } 

    patchRouters()
    {
        this.router.patch('/edit',  GlobleMiddleware.checkError, SmsEmailSettingController.editService );
    }

    deleteRouters()
    {
        this.router.delete('/delete', GlobleMiddleware.checkError, SmsEmailSettingController.delete);
        
    }
}

export default new SmsEmailSettingRouter().router;