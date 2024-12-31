// Role Interface
export interface Role {
  _id: string;
  name: string;
  permissions?: string[];
}

// Competition Result Interface
export interface CompetitionResult {
  competition: string; // Discipline ID
  rank: number;
  discipline: string;
}

// Updated User Interface
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  approved: boolean;
  avatar?: string; // New field - URL or path to avatar
  birth?: string; // ISO date string
  club?: string | IClub; // Club ID or populated Club object
  boat?: string | Boat; // Boat ID or populated Boat object
  gender?: "male" | "female" | "other"; // Enum for gender
  height?: number;
  weight?: number;
  competitionResults?: CompetitionResult[]; // Array of competition results
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
  avatar?: string;
  birth?: string;
  club?: string | null;
  boat?: string | null;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  competitionResults?: CompetitionResult[];
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null; // For generic client-side errors
  serverError: string | null; // For backend messages
  isRegistered: boolean;
  isClubMember?: boolean;
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
// Training Plan - Unified Structure
export interface TrainingPlan {
  _id?: string;
  name: string;
  type?: string;
  segments: Segment[];
  gymSegments: GymSegment[];
  exercises: {
    name: string;
    variant: "standard" | "gym";
    type: string;
    category: string;
    unit?: "m" | "km" | "s" | "min";
    intensityType?:
      | "single"
      | "multiple"
      | "time-intensity"
      | "technique-time-intensity";
    durations?: { duration: number; unit: "m" | "km" | "s" | "min" }[];
    intensities?: { value: string; duration: string; technique: string }[];
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
    intensity?: string;
  }[];
}

export interface TrainingResultsFormData {
  HRodmor: number; // Form - Rest HR
  trajanje: number; // Form - Duration
  razdaljina: number; // Form - Distance
  RPE: number;
  HRprosek: number; // Form - Avg HR
  HRmax: number;
  komentar?: string;
  vremePoZonama: number[];
  zona1: number;
  zona2: number;
  zona3: number;
  zona4: number;
  zona5: number;
  edwardsTRIMP?: number;
  luciaTRIMP?: number;
}

// Rename this to make it clearer it's from backend
export interface TrainingSessionResults {
  HRrest: number;
  duration: number;
  distance: number;
  RPE: number;
  HRavg: number;
  HRmax: number;
  timeInZones: number[];
  comments?: string;
}

// Training State
export interface TrainingPlanState {
  plans: TrainingPlan[];
  loading: boolean;
  error: string | null;
}

export interface TrainingSession {
  _id?: string;
  plan: TrainingPlan; // Refers to updated TrainingPlan with exercises
  athlete: string | User;
  coach: string | User;
  date: string;
  iteration: number;
  status: "upcoming" | "completed";
  results?: TrainingSessionResults;
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
  edit: ITeam | null; // Team being edited
  isLoading: boolean; // Loading state for teams
  error: string | null; // Error message, if any
}

// Club Interface
export interface IClub {
  _id?: string; // Optional for new clubs
  name: string;
  location: string;
  athletes: User[]; // Populated users (athletes)
  coaches: User[]; // Populated users (coaches)
  createdAt?: string;
  updatedAt?: string;
}

// Club State
export interface ClubState {
  clubs: IClub[];
  edit: IClub | null;
  isLoading: boolean;
  error: string | null;
}

// Boat Interface
export interface Boat {
  _id: string;
  name: string;
}

// Boat State
export interface BoatState {
  boats: Boat[];
  edit: Boat | null;
  isLoading: boolean;
  error: string | null;
}

// Discipline Interface
export interface Discipline {
  _id: string;
  distance: number;
  unit: "m" | "km";
}

// Discipline State
export interface DisciplineState {
  disciplines: Discipline[];
  edit: Discipline | null;
  isLoading: boolean;
  error: string | null;
}

// Training Type State
export interface TrainingTypeState {
  types: TrainingType[];
  isLoading: boolean;
  error: string | null;
}

// Mental Health Entry Interface
export interface MentalHealthEntry {
  _id: string;
  user: { firstName: string; lastName: string } | string; // Support both cases
  moodRating: number;
  sleepQuality?: number;
  pulse?: number;
  date: string; // ISO date string
  adminOverride: boolean;
  comment?: string;
  createdAt?: string; // Add createdAt as optional
}

// Mental Health State
export interface MentalHealthState {
  entries: MentalHealthEntry[];
  myEntries: MentalHealthEntry[];
  edit: MentalHealthEntry | null;
  isLoading: boolean;
  error: string | null;
}

// Training Type and Category Interfaces
export interface TrainingType {
  _id: string;
  name: string;
  categories: string[]; // Array of category strings
  variant: "standard" | "strength" | "cardio";
  exercises?: string[]; // This guarantees it's treated as an array
  createdAt?: string;
  updatedAt?: string;
}

// Training Type State
export interface TrainingTypeState {
  types: TrainingType[];
  edit: TrainingType | null; // Add the edit property
  isLoading: boolean;
  error: string | null;
}
