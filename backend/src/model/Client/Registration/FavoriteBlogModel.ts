import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    client_bookid: { type: mongoose.Types.ObjectId },
    authurId: { type: [{ type: mongoose.Types.ObjectId }], required: true },
    keyword: { type: [{ type: mongoose.Types.ObjectId }], required: true },
    disorder: { type: [{ type: mongoose.Types.ObjectId }], required: true },
    objective: { type: [{ type: mongoose.Types.ObjectId }], required: true },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('FavoriteBlog', Schema);