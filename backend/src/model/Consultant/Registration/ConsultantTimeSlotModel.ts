import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    consultantTimeId: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    SlotTime: { type: Number, required: false, default: null },
    Sunday: { type: Object, required: false, default: { day: 'Sunday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },
    Monday: { type: Object, required: false, default: { day: 'Monday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },
    Tuesday: { type: Object, required: false, default: { day: 'Tuesday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },
    Wednesday: { type: Object, required: false, default: { day: 'Wednesday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },
    Thursday: { type: Object, required: false, default: { day: 'Thursday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },
    Friday: { type: Object, required: false, default: { day: 'Friday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },
    Saturday: { type: Object, required: false, default: { day: 'Saturday', morning: [], noon: [], afternoon: [], evening: [], night: [] } },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantTimeSlot', Schema);