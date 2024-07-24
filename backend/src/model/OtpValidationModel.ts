import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    mobileOrEmail: { type: String, required: true },
    otp: { type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('OtpValidation', Schema);