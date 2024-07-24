import mongoose, { model } from 'mongoose';
import { Utils } from '../../../utils/utils';

const Schema = new mongoose.Schema({
    consultant_id: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    degree_name: { type: String, required: true },
    school_name: { type: String, required: true, default: null },
    year_of_graduation: { type: String, required: false, default: null },
    country: { type: mongoose.Types.ObjectId, required: true, default: null },
    attachment: { type: String, required: false, default: null, get: (value?: string) => Utils.getFileFullUrl(value) },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantEducation', Schema);