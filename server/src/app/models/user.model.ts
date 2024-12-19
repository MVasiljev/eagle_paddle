import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "./role.model";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: mongoose.Schema.Types.ObjectId | IRole | null;
  approved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
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
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.model<IUser>("User", UserSchema);
