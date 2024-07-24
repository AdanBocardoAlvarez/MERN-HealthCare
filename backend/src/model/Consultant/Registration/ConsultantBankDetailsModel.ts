import mongoose, { model } from 'mongoose';
import { Utils } from '../../../utils/utils';

const Schema = new mongoose.Schema({
    consultant_bankUser: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    payment_currency: { type: String, required: true },
    tax_information: { type: String, required: true },
    country: { type: mongoose.Types.ObjectId, required: true },
    bank_name: { type: String, required: true },
    bank_Agency_name: { type: String, required: false, default: null },
    agency_address: { type: String, required: true },
    swift_code: { type: String, required: true, default: null },
    account_number: { type: Number, required: true, default: null },
    branch_code: { type: String, required: true, default: null },
    Iban: { type: String, required: false, default: null },
    control_key: { type: String, required: false, default: null },
    account_holder_name: { type: String, required: true, default: null },
    account_currency: { type: String, required: true, default: null },
    add_bank_information: {
        type: String, required: true, default: null, comment: 'Bank Document Attachment (PDF, Image)',
        get: (value?: string) => Utils.getFileFullUrl(value)
    },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantBankDetails', Schema);