import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "./role.model";
import { IClub } from "./club.model";
import { IBoat } from "./boat.model";
import { IDiscipline } from "./discipline.model";

export interface ICompetitionResult {
  competition: mongoose.Schema.Types.ObjectId | IDiscipline;
  rank: number;
  discipline: string;
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: mongoose.Schema.Types.ObjectId | IRole | null;
  approved: boolean;
  avatar?: string;
  birth?: Date;
  club?: mongoose.Schema.Types.ObjectId | IClub;
  boat?: mongoose.Schema.Types.ObjectId | IBoat;
  gender?: "male" | "female" | "other";
  height?: number;
  weight?: number;
  competitionResults?: ICompetitionResult[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CompetitionResultSchema = new Schema<ICompetitionResult>(
  {
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discipline",
      required: true,
    },
    rank: { type: Number, required: true },
    discipline: { type: String, required: true },
  },
  { _id: false } // No _id for sub-documents
);

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    approved: {
      type: Boolean,
      default: false,
      validate: {
        validator: function (this: IUser) {
          if (this.approved && !this.role) {
            return false;
          }
          return true;
        },
        message: "User cannot be approved without a valid role.",
      },
    },
    avatar: { type: String, default: null },
    birth: { type: Date, default: null },
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club", default: null },
    boat: { type: mongoose.Schema.Types.ObjectId, ref: "Boat", default: null },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },
    height: { type: Number, default: null },
    weight: { type: Number, default: null },
    competitionResults: [CompetitionResultSchema],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.model<IUser>("User", UserSchema);
