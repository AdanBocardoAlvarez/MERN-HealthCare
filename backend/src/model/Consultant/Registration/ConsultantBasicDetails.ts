import mongoose, { model } from 'mongoose';
import { Utils } from '../../../utils/utils';

const Schema = new mongoose.Schema({
    consultantUserId: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    Correspondence_language: { type: mongoose.Types.ObjectId, required: true },
    spoken_language: { type: [{ type: mongoose.Types.ObjectId }], required: true, default: [] },
    profession: { type: String, required: false },
    country_of_birth: { type: mongoose.Types.ObjectId, required: true, default: null },
    nationality: { type: mongoose.Types.ObjectId, required: true },
    id_number: { type: String, required: true, default: null, comment: '' },
    id_number_attachment: {
        type: String, required: false, default: null, comment: 'image/pdf',
        get: (value?: string) => Utils.getFileFullUrl(value)
    },
    year_of_experience: { type: String, required: true, default: null },
    criminal_record: { type: String, required: true, default: null, comment: 'true=if yes  / false = if no' },
    criminal_record_attachment: {
        type: String, required: false, default: null,
        get: (value?: string) => Utils.getFileFullUrl(value)
    },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantBasicDetails', Schema);