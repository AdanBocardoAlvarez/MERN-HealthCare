import mongoose, { model } from 'mongoose';
import { Utils } from '../../../utils/utils';

const Schema = new mongoose.Schema({
    userEducation: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    gra_degree_name: { type: String, required: true },
    gra_school_name: { type: String, required: true, default: null },
    gra_year_of_graduation: { type: String, required: false, default: null },
    gra_country: { type: mongoose.Types.ObjectId, required: true, default: null },
    gra_num_of_degree: { type: String, required: false, default: 0 },
    gra_degree_attachment: { type: String, required: true, default: null, get: (value?: string) => Utils.getFileFullUrl(value) },

    post_degree_name: { type: String, required: false, default: null, },
    post_school_name: { type: String, required: false, default: null },
    post_year_of_graduation: { type: String, required: false, default: null },
    post_country: { type: mongoose.Types.ObjectId, required: false, default: null },
    post_num_of_degree: { type: String, required: false, default: null },
    post_degree_attachment: { type: String, required: false, default: null, get: (value?: string) => Utils.getFileFullUrl(value) },

    //certificates: { type: String, required: true , default:null},
    edu_specialization: { type: [{ type: mongoose.Types.ObjectId }], required: true, default: [] },
    edu_disorders: { type: [{ type: mongoose.Types.ObjectId }], required: true, default: [] },
    edu_resume: { type: String, required: true, default: null, get: (value?: string) => Utils.getFileFullUrl(value) },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantEducationDetails', Schema);