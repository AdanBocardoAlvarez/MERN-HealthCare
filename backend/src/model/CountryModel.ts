import mongoose, { model } from 'mongoose';
import { Utils } from '../utils/utils';

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    isdcode: { type: String, required: true },
    country_flag: { type: String, required: true, get: (value?: string) => Utils.getFileFullUrl(value) },
    status: { type: Number, default: 1 },
    cities: [{ type: mongoose.Types.ObjectId, ref: "cities" }],
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('Country', Schema);