import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    raised_by: { type: mongoose.Types.ObjectId, required: true },
    raised_against: { type: mongoose.Types.ObjectId, required: true },
    complaint_type: { type: mongoose.Types.ObjectId, required: true, default: null },
    action_type: { type: String, required: false, default: null },
    status: { type: Number, default: 0, Comment: '0=raise,1=underReview,2=ReSolve' },
    type: { type: Number, default: 1, Comment: '1 = Client to Consultant, 2 = Consultant to Client' },
    decision_favour: { type: Number, default: 0, Comment: '0=no_decision,1=client,2=consultant' },
    desc: { type: String, required: false, default: null },
    additional_details: { type: String, required: false, default: null },
    attachment: { type: String, required: false, default: null },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('Complaint', Schema);
