import express from "express";
import {
  listRoles,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role.controller";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";
import { roleSchema } from "../validations/role.validation";
import { validateSchema } from "../validations/schema";

const router = express.Router();

/**
 * @route GET /roles
 * @description Fetch all roles (admin only).
 */
router.get("/", authenticate, listRoles);

/**
 * @route POST /roles
 * @description Create a new role (admin only).
 */
router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  validateSchema(roleSchema.create),
  createRole
);

/**
 * @route PUT /roles/:id
 * @description Update a role by ID (admin only).
 */
router.put("/:id", authenticate, validateSchema(roleSchema.update), updateRole);

/**
 * @route DELETE /roles/:id
 * @description Delete a role by ID (admin only).
 */
router.delete("/:id", authenticate, authorizeRole("admin"), deleteRole);

export default router;
