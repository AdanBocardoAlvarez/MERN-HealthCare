import { Router } from "express";
import { ComApiController } from "../controller/ComApiController";
import { WatingUserController } from "../controller/WatingUserController";

export class CommanApiRouterRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
    }

    getRouters() {
        this.router.get('/get-country', ComApiController.getCountry);
        this.router.get('/get-languages', ComApiController.getLanguages);
        this.router.get('/get-nationality', ComApiController.getNationality);
        this.router.get('/get-specialization', ComApiController.getSpecialization);
        this.router.get('/get-disorders', ComApiController.getDisorders);
        this.router.get('/get-user-waiting-list', WatingUserController.index);
        this.router.get('/get-contact-us-list', WatingUserController.contactUs);
    }
}

export default new CommanApiRouterRouter().router;