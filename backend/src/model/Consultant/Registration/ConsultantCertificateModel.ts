import mongoose, { model } from 'mongoose';
import { Utils } from '../../../utils/utils';

const Schema = new mongoose.Schema({
    userCertificate: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    name: { type: String, required: true },
    certificate_name: { type: String, required: true, default: null },
    year_of_certificate: { type: String, required: false, default: null },
    num_of_certificate: { type: String, required: false, default: null },
    certificate_attachment: { type: String, required: true, default: null, get: (value?: string) => Utils.getFileFullUrl(value) },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantCertificateModel', Schema);