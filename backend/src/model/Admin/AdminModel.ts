import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    reset_password_token: { type: Number, default: null },
    reset_password_token_time: { type: Date, default: null, required: false },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('Admin', Schema);