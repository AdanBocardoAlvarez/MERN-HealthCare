import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    title: { type: String, required: true, default: null },
    author_name: { type: mongoose.Types.ObjectId, required: true },
    des: { type: String, required: true, default: null },
    image: { type: String, required: false, default: null },
    keywords: { type: [{ type: mongoose.Types.ObjectId }], default: [] },
    disorder: { type: [{ type: mongoose.Types.ObjectId }], default: [] },
    objective: { type: [{ type: mongoose.Types.ObjectId }], default: [] },
    status: { type: Number, default: 1 },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('Blog', Schema);