import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    type: { type: String, required: true },
    subject: { type: String, required: false, default: null },
    sms_tmpid: { type: String, required: false },
    sms_content: { type: String, required: false },
    mail_title: { type: String, required: false, default: null },
    mail_description: { type: String, required: false, default: null },
    status: { type: Number, default: 0 },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('smsEmailSetting', Schema);