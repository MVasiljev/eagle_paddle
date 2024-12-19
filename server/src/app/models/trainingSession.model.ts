import mongoose, { Schema, Document } from "mongoose";

export interface ITrainingSession extends Document {
  plan: mongoose.Schema.Types.ObjectId;
  athlete: mongoose.Schema.Types.ObjectId; // Single reference to Athlete
  coach: mongoose.Schema.Types.ObjectId; // Single reference to Coach
  date: Date;
  iteration: number;
  status: "upcoming" | "completed";
  results: {
    HRrest?: number;
    duration?: number;
    distance?: number;
    RPE?: number; // Rating of perceived exertion
    timeInZones?: number[]; // Five zones
    HRavg?: number;
    HRmax?: number;
  };
}

const trainingSessionSchema: Schema = new Schema(
  {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingPlan",
      required: true,
    },
    athlete: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for athletes
      required: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for coaches
      required: true,
    },
    date: { type: Date, required: true },
    iteration: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming",
    },
    results: {
      HRrest: { type: Number },
      duration: { type: Number },
      distance: { type: Number },
      RPE: { type: Number },
      timeInZones: [Number],
      HRavg: { type: Number },
      HRmax: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITrainingSession>(
  "TrainingSession",
  trainingSessionSchema
);
