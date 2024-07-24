import mongoose, { model } from 'mongoose';
import { Utils } from '../../../utils/utils';

const Schema = new mongoose.Schema({
    consultant_profileid: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    profile_img: { type: String, required: false, get: (value?: string) => Utils.getFileFullUrl(value) },
    bio: { type: String, required: false, default: null },
    professionalCounseling: { type: String, required: false, default: null },
    intro_vedio: { type: String, required: false, default: null },
    keywords: { type: [{ type: mongoose.Types.ObjectId }], default: [] },
    Objectives: { type: [{ type: mongoose.Types.ObjectId }], default: [] },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantProfileAndKeywordDetails', Schema);