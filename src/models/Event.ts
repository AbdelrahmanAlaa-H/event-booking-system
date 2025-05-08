// models/Event.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Event extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  tags: mongoose.Schema.Types.ObjectId[];
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
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Event>("Event", eventSchema);
