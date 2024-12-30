import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
import Role, { IRole } from "../models/role.model";
import logger from "../../config/logger";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

/**
 * @route POST /auth/register
 * @description Registers a new user. Role is optional and will be set by admin if not provided.
 * @bodyParam {string} firstName - The first name of the user (required).
 * @bodyParam {string} lastName - The last name of the user (required).
 * @bodyParam {string} email - The user's email (required, must be unique).
 * @bodyParam {string} password - The user's password (required, minimum 6 characters).
 * @bodyParam {string} [role] - Optional role assigned to the user (e.g., "admin", "coach").
 * @response {201} - User registered successfully.
 * @response {400} - Email already in use or invalid role provided.
 * @response {500} - Failed to register user.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email already in use." });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role if provided (optional during registration)
    // let role = null;
    // if (roleName) {
    //   role = await Role.findOne({ name: roleName });
    //   if (!role) {
    //     res.status(400).json({ error: `Invalid role: ${roleName}` });
    //     return;
    //   }
    // }

    // Create the user
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: null, // Role is optional
      approved: false, // Admin must approve
    });

    logger.info(`User registered: ${email}`);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    logger.error("Registration error: %o", error);
    res.status(500).json({ error: "Registration failed." });
  }
};

/**
 * @route POST /auth/login
 * @description Authenticates a user and returns a JWT token if credentials are valid.
 * @bodyParam {string} email - The user's email (required).
 * @bodyParam {string} password - The user's password (required).
 * @response {200} - Login successful with JWT token.
 * @response {401} - Invalid credentials.
 * @response {403} - Account not approved by admin.
 * @response {404} - User not found.
 * @response {500} - Failed to authenticate user.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if the user exists and populate the role field
    const user = await User.findOne({ email }).populate("role");
    console.log("Queried User:", user);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Check if the user is approved
    if (!user.approved) {
      res.status(403).json({ error: "Your account is not approved." });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Include the populated role
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info(`User logged in: ${email}`);
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role, // Populated role object
        approved: user.approved,
      },
      message: "Login successful.",
    });
  } catch (error) {
    logger.error("Login error: %o", error);
    res.status(500).json({ error: "Login failed." });
  }
};
