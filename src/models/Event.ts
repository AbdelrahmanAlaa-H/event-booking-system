import mongoose, { Schema, Document } from "mongoose";

interface Event extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const eventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // ربط المستخدم الذي أنشأ الحدث
  },
  {
    timestamps: true, // إضافة تاريخ الإنشاء والتحديث تلقائيًا
  }
);

export default mongoose.model<Event>("Event", eventSchema);
