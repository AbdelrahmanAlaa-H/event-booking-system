import mongoose, { Schema, Document } from "mongoose";
import Category from "./Category";
import Tag from "./Tag";

export interface Event extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  tags: mongoose.Schema.Types.ObjectId[];
  price: number;
}

const eventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
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
    price: { type: Number, required: true }, // إضافة price هنا
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Event>("Event", eventSchema);
