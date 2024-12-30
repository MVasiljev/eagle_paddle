import mongoose, { Schema, Document } from "mongoose";

export interface IBoat extends Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const BoatSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBoat>("Boat", BoatSchema);
