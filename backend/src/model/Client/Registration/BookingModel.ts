import mongoose, { model } from 'mongoose';

const Schema = new mongoose.Schema({
    consultant_bookid: { type: mongoose.Types.ObjectId },
    client_bookid: { type: mongoose.Types.ObjectId },
    amount: { type: String, required: true },
    fees: { type: String, required: true },
    book_date: { type: Date, required: true },
    book_time: { type: String, required: true },
    pdf_path: { type: String, required: false, default: null },
    orderId: { type: String, required: false, default: null },
    InvoicNumber: { type: String, required: false, default: null },
    paymentId: { type: String, required: false, default: null },
    clientSecret: { type: String, required: false, default: null },
    paymentStatus: { type: Number, required: true, default: 0, comment: "0 : pending, 1: success, 2 : failed" },
    deleted_at: { type: Date, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default model('BookingModel', Schema);