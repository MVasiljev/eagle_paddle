import mongoose, { Schema, Document } from "mongoose";

// Training Plan Interface
export interface ITrainingPlan extends Document {
  name: string;
  exercises: {
    name: string;
    variant: "standard" | "gym"; // Type of exercise
    type: string; // e.g., "Endurance", "Strength"
    category: string; // e.g., "Aerobic Base", "Lifting"

    // Standard Segment Fields
    unit?: "m" | "km" | "s" | "min";
    intensityType?:
      | "single"
      | "multiple"
      | "time-intensity"
      | "technique-time-intensity";
    durations?: { duration: number; unit: "m" | "km" | "s" | "min" }[];
    intensities?: { value: string; duration: string; technique: string }[];
    series?: number; // Number of series
    repetitions?: number; // Number of repetitions
    restBetweenSeries?: number; // Rest between series in seconds
    restBetweenRepetitions?: number; // Rest between repetitions in seconds

    // Gym Segment Fields
    reps?: number; // Repetitions for gym exercises
    weight?: number; // Weight in kg
    sets?: number; // Sets
    pauseBetweenSets?: number; // Rest time between sets in seconds

    // Cardio-Specific Fields (if applicable)
    duration?: number; // Total duration in seconds
    distance?: number; // Distance in meters
    intensity?: string; // Intensity level (e.g., "low", "medium", "high")
  }[];
}

// Training Plan Schema
const trainingPlanSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        variant: { type: String, enum: ["standard", "gym"], required: true },
        type: { type: String, required: true },
        category: { type: String, required: true },

        // Standard Segment Fields
        unit: { type: String, enum: ["m", "km", "s", "min"] },
        intensityType: {
          type: String,
          enum: [
            "single",
            "multiple",
            "time-intensity",
            "technique-time-intensity",
          ],
        },
        durations: [
          {
            duration: { type: Number, min: 1 },
            unit: { type: String, enum: ["m", "km", "s", "min"] },
          },
        ],
        intensities: [
          {
            value: { type: String },
            duration: { type: String },
            technique: { type: String },
          },
        ],
        series: { type: Number, min: 1 },
        repetitions: { type: Number, min: 1 },
        restBetweenSeries: { type: Number, min: 0 },
        restBetweenRepetitions: { type: Number, min: 0 },

        // Gym Segment Fields
        reps: { type: Number, min: 1 },
        weight: { type: Number, min: 0 },
        sets: { type: Number, min: 1 },
        pauseBetweenSets: { type: Number, min: 0 },

        // Cardio-Specific Fields
        duration: { type: Number, min: 1 },
        distance: { type: Number, min: 0 },
        intensity: { type: String }, // Optional
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ITrainingPlan>(
  "TrainingPlan",
  trainingPlanSchema
);
