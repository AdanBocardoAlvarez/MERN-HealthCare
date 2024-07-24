import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { CountryValidator } from "../validators/CountryValidators";
import { CountryController } from "../controller/CountryController";
import { Utils } from "../utils/utils";

export class CountryRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', CountryController.getAllService);
        this.router.get('/get-trashed-record', CountryController.getDataWithTrash);
        this.router.get('/get-record-by-id', CountryController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', new Utils().country_flag.single('country_flag'), CountryValidator.storeService(), GlobleMiddleware.checkError, CountryController.storeService);
        this.router.post('/status', CountryValidator.activeService(), GlobleMiddleware.checkError, CountryController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', new Utils().country_flag.single('country_flag'), CountryController.editService);
        this.router.patch('/restore', CountryController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', CountryValidator.deleteService(), GlobleMiddleware.checkError, CountryController.deleteService);
        this.router.delete('/multi-delete', CountryController.multiDelteService);

        this.router.delete('/temp-delete', CountryValidator.tempDeleteService(), GlobleMiddleware.checkError, CountryController.tempDeleteService);
        this.router.delete('/temp-multi-delete', CountryController.tempMultiDelteService);
    }
}

export default new CountryRouter().router;