import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../../config/logger";
import { log } from "console";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  logger.debug("Token:", token);

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      userId?: string;
    };

    if (!decoded.userId) {
      res.status(401).json({ error: "Invalid token." });
      return;
    }

    logger.debug("Decoded JWT:", decoded);
    logger.debug("User ID:", decoded.userId);

    // Fetch the user from the database
    const user = await User.findById(decoded.userId).populate("role");
    if (!user) {
      res.status(401).json({ error: "User not found." });
      return;
    }

    req.user = user; // Attach full user object to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

export const authorizeRole =
  (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as JwtPayload | undefined;

    if (!user || user.role.name !== requiredRole) {
      res
        .status(403)
        .json({ error: "Access denied. Insufficient permissions." });
      return;
    }

    next();
  };
