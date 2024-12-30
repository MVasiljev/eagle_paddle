import mongoose, { Schema, Document } from "mongoose";

export interface IDiscipline extends Document {
  distance: number;
  unit: "m" | "km";
  createdAt?: Date;
  updatedAt?: Date;
}

const DisciplineSchema: Schema = new Schema(
  {
    distance: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["m", "km"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IDiscipline>("Discipline", DisciplineSchema);
