import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    content: { type: String, required: true },
    active_policy: { type: Number, default: 0 },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('PrivacyPolicy', Schema);