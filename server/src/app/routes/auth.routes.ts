import express from "express";
import { register, login } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { validateSchema } from "../validations/schema";

const router = express.Router();

/**
 * @route POST /auth/register
 * @description Registers a new user. Validates the request body against the registration schema.
 * @bodyParam {string} firstName - The first name of the user (required).
 * @bodyParam {string} lastName - The last name of the user (required).
 * @bodyParam {string} email - The user's email (required, must be unique).
 * @bodyParam {string} password - The user's password (required, minimum 6 characters).
 * @bodyParam {string} [role] - Optional role assigned to the user (e.g., "admin", "coach").
 * @response {201} - User registered successfully.
 * @response {400} - Validation error or email already in use.
 * @response {500} - Failed to register user.
 */
router.post("/register", validateSchema(registerSchema), register);

/**
 * @route POST /auth/login
 * @description Authenticates a user and returns a JWT token if credentials are valid.
 * @bodyParam {string} email - The user's email (required).
 * @bodyParam {string} password - The user's password (required).
 * @response {200} - Login successful with JWT token.
 * @response {400} - Validation error.
 * @response {401} - Invalid credentials.
 * @response {403} - Account not approved by admin.
 * @response {404} - User not found.
 * @response {500} - Failed to authenticate user.
 */
router.post("/login", validateSchema(loginSchema), login);

export default router;
