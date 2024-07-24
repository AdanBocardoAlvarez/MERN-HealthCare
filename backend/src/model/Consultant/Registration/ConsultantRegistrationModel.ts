import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    unique_code: { type: String, required: false },
    family_name: { type: String, required: true, comment: 'surname/family_name' },
    given_name: { type: String, required: true },
    gender: { type: String, required: true, comment: 'male/female/trans/Don’t want to identify' },
    DOB: { type: String, required: true },
    email: { type: String, required: true },
    contact_number: { type: Number, required: true },
    alternative_number: { type: Number, required: false, default: 0 },
    contact_number_isd: { type: String, required: true },
    alternative_number_isd: { type: String, required: false, default: 0 },
    // country: { type: mongoose.Types.ObjectId, required: false },
    // city: { type: mongoose.Types.ObjectId, required: false },

    contact_number_whatapp: { type: Number, max: 4, required: true, default: 0, comment: '1=contact number, 2=alternative' },
    // alternative_number_whatapp: { type: Boolean, required: false , default: false, comment: 'false=no, true=yes'},
    preferred_type: { type: Array, required: true, default: 0, comment: '1=Email, 2=Telephone' },

    password: { type: String, required: true },
    reset_password_token: { type: Number, default: null },
    reset_password_token_time: { type: Date, default: null, required: false },
    verify_email_token_time: { type: Date, default: null, required: false },

    email_verify: { type: Number, required: false, default: 0 },
    number_verify: { type: Number, required: false, default: 0, },

    verified_status: { type: Number, default: 0, comment: '0=underApproval,1=UserApproval,2=Reject' },
    active_status: { type: Number, default: 0, comment: '0=Deactive,1=Active,2=Suspended' },
    accept_tc_pp: { type: Boolean, default: false, comment: '1=Accept,0=not Accept' },
    document: { type: String, required: false, default: null },
    timezone: { type: String, required: true, default: 'Europe/Paris' },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantRegistration', Schema);