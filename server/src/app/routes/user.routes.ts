import express from "express";
import {
  getUserFromToken,
  approveUser,
  listApprovedUsers,
  listUnapprovedUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";
import {
  approveUserSchema,
  updateUserSchema,
} from "../validations/user.validation";
import { validateSchema } from "../validations/schema";

const router = express.Router();

/**
 * @route GET /users
 * @description Fetches a paginated list of approved users. Optionally filters users by role if the 'role' query parameter is provided.
 * @queryParam {string} [role] - Optional role to filter users by (e.g., "admin", "coach").
 * @queryParam {number} [page=1] - The page number for pagination (default is 1).
 * @queryParam {number} [limit=10] - The number of users per page for pagination (default is 10).
 * @response {200} - Paginated list of approved users, including total users and total pages.
 * @response {500} - Failed to fetch approved users.
 */
router.get("/", authenticate, listApprovedUsers);

/**
 * @route GET /users/unapproved
 * @description Fetches a list of unapproved users. Restricted to admins.
 * @response {200} - List of unapproved users.
 * @response {403} - Access denied if the user is not an admin.
 * @response {500} - Failed to fetch unapproved users.
 */
router.get(
  "/unapproved",
  authenticate,
  authorizeRole("admin"),
  listUnapprovedUsers
);

/**
 * @route GET /users/me
 * @description Extracts the authenticated user's details from the JWT token in the Authorization header.
 * @header {string} Authorization - Bearer token.
 * @response {200} - User details without the password field.
 * @response {401} - No token provided.
 * @response {404} - User not found.
 * @response {500} - Failed to fetch user details.
 */
router.get("/me", authenticate, getUserFromToken);

/**
 * @route GET /users/:id
 * @description Fetches a user by their ID. Only approved users are returned unless the requester is an admin.
 * @param {string} id - User ID as a route parameter.
 * @response {200} - User details without the password field.
 * @response {403} - Access denied if the user is not approved and the requester is not an admin.
 * @response {404} - User not found.
 * @response {500} - Failed to fetch user.
 */
router.get("/:id", authenticate, getUser);

/**
 * @route PUT /users/:id
 * @description Updates the first name and last name of a user.
 * @param {string} id - User ID as a route parameter.
 * @bodyParam {string} firstName - Updated first name.
 * @bodyParam {string} lastName - Updated last name.
 * @response {200} - Updated user details without the password field.
 * @response {404} - User not found.
 * @response {500} - Failed to update user details.
 */
router.put("/:id", authenticate, validateSchema(updateUserSchema), updateUser);

/**
 * @route PUT /users/:id/approve
 * @description Updates the approval status of a user. Restricted to admins.
 * @param {string} id - User ID as a route parameter.
 * @bodyParam {boolean} approved - Approval status.
 * @response {200} - Updated user details with approval status.
 * @response {400} - Invalid approval value provided.
 * @response {403} - Access denied if the user is not an admin.
 * @response {404} - User not found.
 * @response {500} - Failed to update approval status.
 */
router.put(
  "/:id/approve",
  authenticate,
  authorizeRole("admin"),
  validateSchema(approveUserSchema),
  approveUser
);

export default router;
