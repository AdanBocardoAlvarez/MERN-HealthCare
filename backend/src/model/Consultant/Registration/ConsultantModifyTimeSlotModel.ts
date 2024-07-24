import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    consultantModifyTimeId: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    Date: { type: Date, required: true, default: null },
    ModifyTimeSlot: { type: Object, required: false, default: { day: '', morning: [], afternoon: [], evening: [], night: [] } },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantModifyTimeSlot', Schema);