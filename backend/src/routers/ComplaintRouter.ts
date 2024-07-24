import { Router } from "express";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { ComplaintValidator } from "../validators/ComplaintValidator";
import { ComplaintController } from "../controller/ComplaintController";

export class ComplaintRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', ComplaintController.index);
        this.router.get('/get-trashed-record', ComplaintController.getDataWIthTrash);

        this.router.get('/get-record-by-id', ComplaintController.getClientRecordById);
        this.router.get('/get-record-by-client-id', ComplaintController.getClientRecordById);
        this.router.get('/get-record-by-consultant-id', ComplaintController.getConsultantRecordById);

        this.router.get('/view-full-consultant-complaint', ComplaintController.getComplaintByClient);
        this.router.get('/view-full-client-complaint', ComplaintController.getComplaintByConsultant);
    }

    postRouters() {
        // this.router.post('/store',  new Utils().blog.array('attachment',1),  GlobleMiddleware.checkError, ComplaintController.store);
        this.router.post('/status', ComplaintValidator.activeRecord(), GlobleMiddleware.checkError, ComplaintController.activeRecord);
    }

    patchRouters() {
        this.router.patch('/edit', ComplaintValidator.edit(), ComplaintController.edit);
        this.router.patch('/restore', ComplaintController.restoreRecord);
    }

    deleteRouters() {
        this.router.delete('/delete', GlobleMiddleware.checkError, ComplaintController.delete);
        this.router.delete('/multi-delete', ComplaintController.multiDelte);

        this.router.delete('/temp-delete', ComplaintValidator.tempDelete(), GlobleMiddleware.checkError, ComplaintController.tempDelete);
        this.router.delete('/temp-multi-delete', ComplaintController.tempMultiDelte);
    }
}

export default new ComplaintRouter().router;