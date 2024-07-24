import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    consultantTimeId: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    SlotTime: { type: Number, required: false, default: null },
    Day: { type: String, required: true, default: null },
    SlotArray: { type: Array, required: true, default: null },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantTimeSlotTwo', Schema);