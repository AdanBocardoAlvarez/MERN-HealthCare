import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    pp_id: { type: mongoose.Types.ObjectId, required: true },
    accepted_userId: { type: mongoose.Types.ObjectId, required: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('AcceptPrivacyPolicy', Schema);