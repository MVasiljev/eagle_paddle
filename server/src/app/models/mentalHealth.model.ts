import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IMentalHealth extends Document {
  user: mongoose.Schema.Types.ObjectId | IUser;
  moodRating: number;
  sleepQuality?: number;
  pulse?: number;
  date: Date;
  adminOverride: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const MentalHealthSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moodRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    sleepQuality: {
      type: Number,
      min: 1,
      max: 5,
    },
    pulse: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    adminOverride: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMentalHealth>(
  "MentalHealth",
  MentalHealthSchema
);
