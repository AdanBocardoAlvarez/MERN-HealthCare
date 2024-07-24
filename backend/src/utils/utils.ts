import bcryptPassword from 'bcrypt';
import moment from 'moment-timezone';
import Multer from 'multer';
import path from 'path';
const MessenteApi = require('messente_api');

const filename = (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
    cb(null, file.fieldname + '-' + uniqueSuffix)
}

const storageOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: filename,
});

const bankDetailsOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/bank_document_image')
    },
    filename: filename,
});

const educationDetailsOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/degree_doc_image')
    },
    filename: filename,
});

const CountryFlagOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/country_flag_image')
    },
    filename: filename,
});


const DigitalProductFlagOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/digital_product')
    },
    filename: filename,
});

const CriminalRecordOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/criminal_record_image')
    },
    filename: filename,
});

const ConsultantProfileOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/consultant_profile_image')
    },
    filename: filename,
});


const ConsultantCertificatesOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/consultant_certificate')
    },
    filename: filename,
});


const BlogOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/blog_image')
    },
    filename: filename,
});

const ProfileImgOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/client_profile_image')
    },
    filename: filename,
});


const WebLogoOptions = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/web_logo')
    },
    filename: filename,
});

export class Utils {

    public MAX_TOKEN_TIME = 2000000;
    public multer = Multer({ storage: storageOptions });
    public web_logo = Multer({ storage: WebLogoOptions });
    public country_flag = Multer({ storage: CountryFlagOptions });
    public digital_product = Multer({ storage: DigitalProductFlagOptions });
    public criminal_record = Multer({ storage: CriminalRecordOptions });
    public profile_image = Multer({ storage: ProfileImgOptions });
    public consultant_profile = Multer({ storage: ConsultantProfileOptions });
    public add_bank_information = Multer({ storage: bankDetailsOptions });
    public educationDetails = Multer({ storage: educationDetailsOptions });
    public consultant_certificate = Multer({ storage: ConsultantCertificatesOptions });
    public blog = Multer({ storage: BlogOptions });

    static generateVerificatioToken(size: number = 5) {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }

    static getFileFullUrl(file?: string, showDefault: boolean = false) {
        if (file) {
            return `${process.env.BASEURL}${file}`;
        } else {
            return showDefault ? `${process.env.BASEURL}/uploads/file-not-found.png` : null;
        }
    }

    static generatRandomPassword(characters, length) {
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    static passwordHash(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcryptPassword.hash(password, 10, function (err, hash) {
                if (err) { reject(err); } else { resolve(hash); }
            })
        });
    }

    static passwordCheckForLogin(password: { simplePassword: string, encryptPassword: string }): Promise<any> {
        return new Promise((resolve, reject) => {
            bcryptPassword.compare(password.simplePassword, password.encryptPassword, function (err, isValid) {
                if (err) { reject(new Error(err.message)) }
                else if (!isValid) { reject(new Error('Entered login details are incorrect')); }
                else { resolve(isValid); }
            });
        });
    }

    static sendOTP(mobile: Number, msg: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const mobileNumber = mobile
            // const Token = OTP;
            const message = msg;

            var urlencoded = new URLSearchParams();
            urlencoded.append("userId", "siddharthk");
            urlencoded.append("password", "7$uCAp7HN8W7");
            urlencoded.append("senderId", "UNBCLR");
            urlencoded.append("sendMethod", "simpleMsg");
            urlencoded.append("msgType", "text");
            urlencoded.append("mobile", `${mobileNumber} `);
            // urlencoded.append("msg", "Use code "+Token+" to verify your Unbachelor account. Please don\\'t share this code. Greater Than Systems");
            urlencoded.append("msg", `${message} `);
            urlencoded.append("duplicateCheck", "true");
            urlencoded.append("format", "json");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            fetch("http://www.smsgateway.center/SMSApi/rest/send", {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            })
                .then(response => response.text())
                .then(result => { resolve(result); })
                .catch(error => reject(new Error(error)));

        })

    }

    static async sendSMS(mobile: Number | string, message: any): Promise<any> {
        try {
            // if (process.env.ENV != 'production') return Promise.resolve(true);

            return new Promise(async (resolve, reject) => {

                try {
                    const defaultClient = MessenteApi.ApiClient.instance;
                    const basicAuth = defaultClient.authentications['basicAuth'];
                    basicAuth.username = '9c86b0cbae87439cb5a0ac5c944f84f0';
                    basicAuth.password = '682bc45299d4489f98633da15b4ada9f';
                    const api = new MessenteApi.OmnimessageApi();
                    const sms = MessenteApi.SMS.constructFromObject({
                        sender: 'VhealTHY', text: message,
                    });
                    const omnimessage = MessenteApi.Omnimessage.constructFromObject({
                        messages: [sms], to: mobile,
                    });

                    api.sendOmnimessage(omnimessage, (error, data) => {
                        if (error) {
                            reject(new Error("Unable to send SMS, please try again later."))
                            return reject(error);
                        } else {
                            return resolve(true);
                        }
                    });

                    // return reject(new Error("We are unable to send SMS at this moment..!! Please Try again later."));
                } catch (error) {
                    return reject(error);
                }
            });
        } catch (error) {
            return false;
        }
    }

    static myMoment(dateTime = undefined, timezone = "Europe/Paris") {
        return moment.tz(dateTime, timezone);
    }
}