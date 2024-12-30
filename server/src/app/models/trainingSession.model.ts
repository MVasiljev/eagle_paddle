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
    comments?: string;
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
      ref: "User",
      required: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      HRrest: { type: Number }, // Puls u mirovanju
      duration: { type: Number }, // Trajanje (minuti)
      distance: { type: Number }, // Razdaljina (km)
      RPE: { type: Number, min: 1, max: 10 }, // RPE (1-10)
      timeInZones: { type: [Number] }, // Time in heart rate zones
      HRavg: { type: Number }, // Average heart rate
      HRmax: { type: Number }, // Maksimalni puls
      comments: { type: String }, // User comments
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITrainingSession>(
  "TrainingSession",
  trainingSessionSchema
);
