export interface Duration {
  duration: number;
  unit: "m" | "km" | "s" | "min";
}

export interface Intensity {
  value: string;
  duration: string;
  technique: string;
}

export interface TrainingCategory {
  id: string;
  name: string;
  subcategories: TrainingSubcategory[];
}

export interface TrainingSubcategory {
  id: string;
  name: string;
}

// Unified Exercise Segment (Standard, Gym, Cardio)
export interface ExerciseSegment {
  name: string;
  variant: "standard" | "gym";
  type: string;
  category: string;
  durations?: Duration[];
  unit?: "m" | "km" | "s" | "min";
  intensityType?:
    | "single"
    | "multiple"
    | "time-intensity"
    | "technique-time-intensity";
  intensities?: Intensity[];
  series?: number;
  repetitions?: number;
  restBetweenSeries?: number;
  restBetweenRepetitions?: number;
  reps?: number;
  weight?: number;
  sets?: number;
  pauseBetweenSets?: number;
  duration?: number;
  distance?: number;
  intensity?: number; // Fix: Intensity is now a number
  exercise?: string;
}

// Plan Interface
export interface Plan {
  planName: string;
  type?: string;
  category?: string;
  durations?: Duration[];
  exercises: ExerciseSegment[]; // Unifies gym + standard segments
}
