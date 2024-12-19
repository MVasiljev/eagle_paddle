import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITeam extends Document {
  name: string;
  coach: mongoose.Schema.Types.ObjectId | IUser;
  members: (mongoose.Schema.Types.ObjectId | IUser)[];
  createdAt?: Date;
  updatedAt?: Date;
}

const TeamSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  { timestamps: true }
);

TeamSchema.index({ coach: 1 });
export default mongoose.model<ITeam>("Team", TeamSchema);
