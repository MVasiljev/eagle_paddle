// Role Interface
export interface Role {
  _id: string;
  name: string;
  permissions?: string[];
}

// User Interfaces
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role; // Use the Role type
  approved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  approved?: boolean;
  role?: Role | null;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null; // For generic client-side errors
  serverError: string | null; // For backend messages
}

// User State
export interface UserState {
  users: User[];
  unapprovedUsers: User[];
  user: User | null;
  isLoading: boolean;
  error: string | null;
  totalUsers: number;
  totalPages: number;
}

// Role State
export interface RoleState {
  roles: Role[];
  isLoading: boolean;
  error: string | null;
}

// Duration and Intensity Interfaces
export interface Duration {
  duration: number;
  unit: string;
}

export interface Intensity {
  value: string;
  duration: string;
  technique: string;
}

// Training Categories
export interface TrainingSubcategory {
  id: string;
  name: string;
}

export interface TrainingCategory {
  id: string;
  name: string;
  subcategories: TrainingSubcategory[];
}

// Segment Interfaces
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

export interface GymSegment {
  name: string;
  type: "Cardio" | "Strength"; // Limited to valid types
  category: string;
  // Strength-specific fields
  reps?: number; // Optional for Strength
  weight?: number; // Weight in kg
  sets?: number; // Number of sets
  pauseBetweenSets?: number; // Pause in seconds
  // Cardio-specific fields
  duration?: number; // Optional for Cardio
  distance?: number; // Distance in meters
  intensity?: string; // Intensity level (e.g., "low", "medium", "high")
  restTime?: number; // Rest time in seconds
}

// Training Plan
export interface TrainingPlan {
  _id?: string;
  name: string;
  segments: Segment[];
  gymSegments: GymSegment[];
}

export interface Plan {
  planName: string;
  type?: string;
  category?: string;
  durations?: Duration[];
  segments: Segment[];
  gymSegments: GymSegment[];
}

// Training Session
export interface TrainingSession {
  _id?: string;
  plan: TrainingPlan; // Training plan ID
  athlete: string; // Athlete user ID
  coach: string; // Coach user ID
  date: string; // ISO date string
  iteration: number;
  status: string; // "upcoming" | "completed"
  results?: Record<string, unknown>; // Session results
}

// Training State
export interface TrainingPlanState {
  plans: TrainingPlan[];
  loading: boolean;
  error: string | null;
}

export interface TrainingSessionState {
  list: TrainingSession[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// ITeam Interface
export interface ITeam {
  _id?: string; // Optional for new teams
  name: string; // Name of the team
  coach: string | User; // Coach ID or User object
  members: (string | User)[]; // Array of Member IDs or User objects
  createdAt?: string; // Optional, ISO date string
  updatedAt?: string; // Optional, ISO date string
}

// Team State
export interface TeamState {
  teams: ITeam[]; // List of teams
  isLoading: boolean; // Loading state for teams
  error: string | null; // Error message, if any
}
