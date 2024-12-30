import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IClub extends Document {
  name: string;
  location: string;
  athletes: (mongoose.Schema.Types.ObjectId | IUser)[];
  coaches: (mongoose.Schema.Types.ObjectId | IUser)[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ClubSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    athletes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    coaches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

ClubSchema.index({ name: 1 });
export default mongoose.model<IClub>("Club", ClubSchema);
