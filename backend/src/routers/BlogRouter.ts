import { Router } from "express";
import { Utils } from "../utils/utils";
import { GlobleMiddleware } from "../Middleware/GlobalMiddleware";
import { BlogValidator } from "../validators/BlogValidators";
import { BlogController } from "../controller/BlogController";

export class BlogRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.getRouters();
        this.postRouters();
        this.patchRouters();
        this.deleteRouters();
    }

    getRouters() {
        this.router.get('/index', BlogController.index);
        this.router.get('/get-trashed-record', BlogController.getDataWIthTrash);
        this.router.get('/get-record-by-id', BlogController.getRecordById);
        this.router.get('/get-author', BlogController.getAuthor);
        this.router.get('/get-disorders-keywors-objectives', BlogController.getDisorders);
    }

    postRouters() {
        this.router.post('/store', new Utils().blog.array('image', 1), BlogValidator.store(), GlobleMiddleware.checkError, BlogController.store);
        this.router.post('/status', BlogValidator.activeRecord(), GlobleMiddleware.checkError, BlogController.activeRecord);
    }

    patchRouters() {
        this.router.patch('/edit', new Utils().blog.array('image', 1), BlogValidator.store(), BlogController.edit);
        this.router.patch('/restore', BlogController.restoreRecord);
    }

    deleteRouters() {
        this.router.delete('/delete', BlogValidator.delete(), GlobleMiddleware.checkError, BlogController.delete);
        this.router.delete('/multi-delete', BlogController.multiDelte);

        this.router.delete('/temp-delete', BlogValidator.tempDelete(), GlobleMiddleware.checkError, BlogController.tempDelete);
        this.router.delete('/temp-multi-delete', BlogController.tempMultiDelte);
    }
}

export default new BlogRouter().router;