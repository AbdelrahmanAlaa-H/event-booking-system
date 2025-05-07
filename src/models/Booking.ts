// models/Booking.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  createdAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // بس نحتاج تاريخ الإنشاء
  }
);

// منع تكرار الحجز لنفس الحدث من نفس المستخدم
bookingSchema.index({ user: 1, event: 1 }, { unique: true });

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
export default Booking;
