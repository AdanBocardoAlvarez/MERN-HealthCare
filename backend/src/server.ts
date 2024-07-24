import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import { getEnv } from './environments/env';
import ConsultantRegistrationRouter from './routers/Consultant/Registration/ConsultantRegistrationRouter';
import ClientRegistrationRouter from './routers/Client/Registration/ClientRegistrationRouter';
import CountryRouter from './routers/CountryRouter';
import CityRouter from './routers/CityRouter';
import BlogRouter from './routers/BlogRouter';
import DigitalProductRouter from './routers/DigitalProductRouter';
import QuoteRouter from './routers/QuoteRouter';
import CommanApiRouter from './routers/CommanApiRouter';
import SpecializationRouter from './routers/SpecializationRouter';
import DisordersRouter from './routers/DisordersRouter';
import NationalityRouter from './routers/NationalityRouter';
import LanguagesRouter from './routers/LanguagesRouter';
import KeywordRouter from './routers/KeywordRouter';
import ObjectivesRouter from './routers/ObjectivesRouter';
import ConsultantRouter from './routers/Admin/ConsultantRouter';
import ClientRouter from './routers/Admin/ClientRouter';
import AdminSettingRouter from './routers/Admin/AdminSettingRouter';
import SmsEmailSettingRouter from './routers/SmsEmailSettingRouter';
import ComplaintRouter from './routers/ComplaintRouter';
import ComplaintTypeRouter from './routers/ComplaintTypeRouter';
import PrivacyPolicyRouter from './routers/PrivacyPolicyRouter';
import TermAndConditionRouter from './routers/TermAndConditionRouter';
import WebSettingRouter from './routers/WebSettingRouter';
import bodyParser from 'body-parser';
import { Jobs } from './jobs/jobs';
import path from 'path';
import { GlobleMiddleware } from './Middleware/GlobalMiddleware';
import { ServerApiVersion } from 'mongodb';

mongoose.set('strictQuery', false);

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.errorHandler();
    }

    setConfigurations() {
        this.connectMongoDb();
        this.setBodyParser();
        Jobs.runRequirdJobs();
    }

    connectMongoDb() {
        mongoose
            .connect(getEnv().db_url, { serverApi: ServerApiVersion.v1 })
            .then(() => {
                console.log('mongooseDB Connect');
            })
            .catch((err) => {
                console.log('mongooseDB connect error = ' + err);
            });
    }

    setBodyParser() {
        this.app.use(cors({ origin: '*' }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(GlobleMiddleware.checkLicense);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        this.app.use(express.static(path.join(__dirname, 'build')));

        // Handles any requests that don't match the ones above
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
        this.app.use('/uploads', express.static('uploads'));
    }

    setRoutes() {
        // Admin Api Urls
        this.app.use('/api/admin-panel/setting/', AdminSettingRouter);
        this.app.use('/api/admin-panel/sms-email-setting/', SmsEmailSettingRouter);
        this.app.use('/api/admin-panel/web-setting/', WebSettingRouter);
        this.app.use('/api/admin-panel/consultant/', ConsultantRouter);
        this.app.use('/api/admin-panel/client/', ClientRouter);
        this.app.use('/api/admin-panel/country/', CountryRouter);
        this.app.use('/api/admin-panel/city/', CityRouter);
        this.app.use('/api/admin-panel/blog/', BlogRouter);
        this.app.use('/api/admin-panel/digital-product/', DigitalProductRouter);
        this.app.use('/api/admin-panel/quote/', QuoteRouter);
        this.app.use('/api/admin-panel/privacy-policy/', PrivacyPolicyRouter);
        this.app.use('/api/admin-panel/terms-and-conditions/', TermAndConditionRouter);
        this.app.use('/api/admin-panel/complaint/', ComplaintRouter);
        this.app.use('/api/admin-panel/complaint-type/', ComplaintTypeRouter);
        this.app.use('/api/admin-panel/specialization/', SpecializationRouter);
        this.app.use('/api/admin-panel/disorders/', DisordersRouter);
        this.app.use('/api/admin-panel/nationality/', NationalityRouter);
        this.app.use('/api/admin-panel/languages/', LanguagesRouter);
        this.app.use('/api/admin-panel/keywords/', KeywordRouter);
        this.app.use('/api/admin-panel/objectives/', ObjectivesRouter);
        this.app.use('/api/admin-panel/common/', CommanApiRouter);

        // Consultant Api Urls
        this.app.use('/api/consultant/', ConsultantRegistrationRouter);
        this.app.use('/api/client/', ClientRegistrationRouter);
    }

    error404Handler() {
        this.app.all('/uploads/*', (req, res) => res.sendFile(path.resolve(__dirname, '../uploads/404-file-not-found.jpg')));
        this.app.use((req, res) => {
            res.status(404).json({ message: 'not found', status_code: 404 });
        });
    }

    errorHandler() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Worng. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
