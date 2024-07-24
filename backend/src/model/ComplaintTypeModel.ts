import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    name: { type: String, required: true, default: null },
    status: { type: Number, default: 1 },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ComplaintType', Schema);