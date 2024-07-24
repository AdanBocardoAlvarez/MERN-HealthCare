import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    clientUserId: { type: mongoose.Types.ObjectId, ref: "ClientRegistration" },
    Correspondence_language: { type: mongoose.Types.ObjectId, required: true },
    spoken_language: { type: [{ type: mongoose.Types.ObjectId }], required: true, default: [] },
    profession: { type: String, required: false },
    country_of_birth: { type: mongoose.Types.ObjectId, required: true, default: null },
    nationality: { type: mongoose.Types.ObjectId, required: true },

    house_number: { type: String, required: true },
    street_name: { type: String, required: true, default: null },
    street_name2: { type: String, required: false, default: null },
    postal_code: { type: Number, required: true, default: null },
    profile_image: { type: String, required: true, default: null, comment: 'image/pdf' },
    currency_used: { type: String, required: true, default: null },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ClientBasicDetails', Schema);