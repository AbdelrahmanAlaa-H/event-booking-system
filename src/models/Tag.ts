// models/Tag.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
  name: string;
}

const tagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITag>("Tag", tagSchema);
