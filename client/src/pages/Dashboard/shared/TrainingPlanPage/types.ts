export interface Duration {
  duration: number;
  unit: string;
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

export interface GymSegment {
  name: string;
  type: string; // e.g., Cardio, Strength
  category: string;

  // Strength-specific properties
  reps?: number;
  weight?: number; // Weight in kg
  sets?: number; // Number of sets
  pauseBetweenSets?: number; // Pause in seconds

  // Cardio-specific properties
  duration?: number; // Duration in minutes
  distance?: number; // Distance in meters or kilometers
  intensity?: number; // Intensity as a percentage
  restTime?: number; // Rest time in seconds
}

export interface Segment {
  name: string;
  type: string;
  category: string;
  durations: Duration[];
  unit: string;
  intensityType: string;
  intensities: Intensity[];
  seriesCount: number;
  segmentCount: number;
  pauseAfterSeries: number;
  pauseAfterSegment: number;
}

export interface Plan {
  planName: string;
  type?: string;
  category?: string;
  durations?: Duration[];
  segments: Segment[];
  gymSegments: GymSegment[];
}
