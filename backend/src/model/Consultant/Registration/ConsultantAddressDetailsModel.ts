import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    consultant_address: { type: mongoose.Types.ObjectId, ref: "ConsultantRegistration" },
    house_number: { type: String, required: true },
    street_name: { type: String, required: true, default: null },
    street_name2: { type: String, required: false, default: null },
    postal_code: { type: Number, required: true, default: null },
    city: { type: mongoose.Types.ObjectId, required: true, default: null },
    country_of_residence: { type: mongoose.Types.ObjectId, required: true },

    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('ConsultantAddressDetails', Schema);