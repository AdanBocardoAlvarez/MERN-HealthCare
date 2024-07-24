import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    email: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('SaveClient', Schema);