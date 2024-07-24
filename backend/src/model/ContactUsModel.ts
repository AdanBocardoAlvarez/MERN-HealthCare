import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false, default: null },
    organization: { type: String, required: false, default: null },
    subject: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ContactUs', Schema, 'contact_us');