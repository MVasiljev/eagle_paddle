import mongoose, { Schema, Document } from "mongoose";

export interface ITrainingType extends Document {
  name: string;
  variant: "standard" | "strength" | "cardio";
  categories: string[];
  exercises?: string[]; // This guarantees it's treated as an array
  createdAt?: Date;
  updatedAt?: Date;
}

const TrainingTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    variant: {
      type: String,
      enum: ["standard", "strength", "cardio"],
      required: true,
    },
    categories: [{ type: String, required: true }],
    exercises: {
      type: [String], // Ensures exercises is an array of strings
      required: function (this: ITrainingType) {
        return this.variant === "strength" || this.variant === "cardio";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITrainingType>(
  "TrainingType",
  TrainingTypeSchema
);
