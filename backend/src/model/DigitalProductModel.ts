import mongoose, { model } from 'mongoose';
import { Utils } from '../utils/utils';

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitletitle: { type: String, required: true },
    author_name: { type: mongoose.Types.ObjectId },
    des: { type: String, required: true },
    pdf: { type: String, required: true, get: (value?: string) => Utils.getFileFullUrl(value) },
    image: { type: String, required: true, get: (value?: string) => Utils.getFileFullUrl(value) },
    date: { type: Date, required: true },
    status: { type: Number, default: 1 },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('DigitalProduct', Schema);