import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { CityValidator } from "../validators/CityValidators";
import { CityController } from "../controller/CityController";

export class CityRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', CityController.getAllService);
        this.router.get('/get-trashed-record', CityController.getDataWithTrash);
        this.router.get('/get-record-by-id', CityController.getRecordById);
    }

    postRouters() {
        this.router.post('/store', CityValidator.storeService(), GlobleMiddleware.checkError, CityController.storeService);
        this.router.post('/status', CityValidator.activeService(), GlobleMiddleware.checkError, CityController.activeService);
    }

    patchRouters() {
        this.router.patch('/edit', CityController.editService);
        this.router.patch('/restore', CityController.restoreService);
    }

    deleteRouters() {
        this.router.delete('/delete', CityValidator.deleteService(), GlobleMiddleware.checkError, CityController.deleteService);
        this.router.delete('/multi-delete', CityController.multiDelteService);

        this.router.delete('/temp-delete', CityValidator.tempDeleteService(), GlobleMiddleware.checkError, CityController.tempDeleteService);
        this.router.delete('/temp-multi-delete', CityController.tempMultiDelteService);
    }
}

export default new CityRouter().router;