import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    clientId: { type: mongoose.Types.ObjectId },
    sessionId: { type: mongoose.Types.ObjectId },
    consultantId: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('NotesModel', Schema);