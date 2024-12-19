import { User } from "../../app/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
