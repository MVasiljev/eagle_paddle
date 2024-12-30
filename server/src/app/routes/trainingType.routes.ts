import express from "express";
import {
  getAllTrainingTypes,
  getTrainingTypeById,
  createTrainingType,
  updateTrainingType,
  deleteTrainingType,
} from "../controllers/trainingType.controller";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";

import { validateSchema } from "../validations/schema";
import { trainingTypeSchema } from "../validations/trainingType.validation";

const router = express.Router();

/**
 * @route GET /training-types
 * @description Fetch all training types
 */
router.get("/", authenticate, getAllTrainingTypes);

/**
 * @route GET /training-types/:id
 * @description Fetch a training type by ID
 */
router.get("/:id", authenticate, getTrainingTypeById);

/**
 * @route POST /training-types
 * @description Create a new training type (Admin only)
 */
router.post(
  "/",
  authenticate,
  authorizeRole("admin"),
  validateSchema(trainingTypeSchema.create),
  createTrainingType
);

/**
 * @route PUT /training-types/:id
 * @description Update an existing training type (Admin only)
 */
router.put(
  "/:id",
  authenticate,
  authorizeRole("admin"),
  validateSchema(trainingTypeSchema.update),
  updateTrainingType
);

/**
 * @route DELETE /training-types/:id
 * @description Delete a training type (Admin only)
 */
router.delete("/:id", authenticate, authorizeRole("admin"), deleteTrainingType);

export default router;
