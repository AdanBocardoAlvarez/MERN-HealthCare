import { Router } from "express";
import { GlobleMiddleware } from "../../Middleware/GlobalMiddleware";
import { AdminSettingController } from "../../controller/Admin/AdminSettingController";
import { AdminValidater } from "../../validators/Admin/Adminvalidator";

export class AdminSettingRouter {

    public router: Router;

    constructor() {

        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/get-all-booking', GlobleMiddleware.checkAdmin, GlobleMiddleware.checkError, AdminSettingController.getAllBooking);
    }

    postRouters() {
        this.router.post('/signup', AdminSettingController.signUp);
        this.router.post('/login', AdminValidater.login(), GlobleMiddleware.checkError, AdminSettingController.signIn);
        this.router.post('/change-password', AdminValidater.updatePassword(), GlobleMiddleware.checkAdmin, GlobleMiddleware.checkError, AdminSettingController.updatePassword);
        this.router.post('/forgot-password', AdminValidater.sendForgotPasswordEmail(), GlobleMiddleware.checkError, AdminSettingController.sendForgotPasswordEmail);
        this.router.post('/reset-password', AdminValidater.ResetPassword(), GlobleMiddleware.checkError, AdminSettingController.ResetPassword);
   
   
    }

    patchRouters() {
        // this.router.patch('/restore',  AdminSetting.restoreService);
    }

    deleteRouters() {
        // this.router.delete('/temp-delete', GlobleMiddleware.checkAdmin, NationalityValidators.tempDeleteService() ,GlobleMiddleware.checkError, AdminSetting.tempDeleteService);
    }
}

export default new AdminSettingRouter().router;