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
    contact_number_isd: { type: String, required: true },
    country_of_residence: { type: mongoose.Types.ObjectId, required: false, ref: "Country" },
    city: { type: mongoose.Types.ObjectId, required: false, ref: "City" },
    preferred_type: { type: Array, required: true, default: 0, comment: '1=Email, 2=Telephone' },

    password: { type: String, required: true },
    reset_password_token: { type: Number, default: null },
    reset_password_token_time: { type: Date, default: null, required: false },
    health_assessment: { type: String, default: null, required: false },
    consent_form: { type: String, default: null, required: false },

    email_verify: { type: Number, required: false, comment: '1=verify, 0=not veirfy' },
    number_verify: { type: Number, required: false, comment: '1=verify, 0=not veirfy' },

    verified_status: { type: Number, default: 0, comment: '0=underApproval,1=UserApproval,2=Reject' },
    active_status: { type: Number, default: 0, comment: '0=Deactive,1=Active,2=Suspended' },
    accept_tc_pp: { type: Boolean, default: false, required: true, comment: '0=not accept,1=accept' },
    timezone: { type: String, required: true, default: 'Europe/Paris' },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ClientRegistration', Schema);