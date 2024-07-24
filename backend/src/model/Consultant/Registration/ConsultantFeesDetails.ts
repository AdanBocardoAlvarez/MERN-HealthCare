import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
        ConsultantID: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration", required: true },
        fees: { type: Number, required: true },
        status: { type: Number, default: 1 },
        created_at: { type: Date, default: new Date() },
        updated_at: { type: Date, default: new Date() },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantFeesDetails', Schema);