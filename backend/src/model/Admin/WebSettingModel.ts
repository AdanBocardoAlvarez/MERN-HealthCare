import mongoose, { model } from 'mongoose';
import { Utils } from '../../utils/utils';

const Schema = new mongoose.Schema({
    web_title: { type: String, required: true },
    domain_name_without_extension: { type: String, required: true },
    web_logo: { type: String, required: false, get: (value?: string) => Utils.getFileFullUrl(value) },
    footer_logo: { type: String, required: false, get: (value?: string) => Utils.getFileFullUrl(value) },
    email_logo: { type: String, required: false, get: (value?: string) => Utils.getFileFullUrl(value) },
    // water_logo: { type: String, required: false },
    fab_icon: { type: String, required: false, get: (value?: string) => Utils.getFileFullUrl(value) },
    web_tw: { type: String, required: false },
    web_yt: { type: String, required: false },
    web_insta: { type: String, required: false },
    web_linkedin: { type: String, required: false },
    web_legal_name: { type: String, required: false },
    web_created_at: { type: Date, default: new Date() },
    web_updated_at: { type: Date, default: new Date() },
    web_deleted_at: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('web_setting', Schema);