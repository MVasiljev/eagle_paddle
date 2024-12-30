import express from "express";
import {
  getAllMentalHealthRecords,
  getMentalHealthRecordById,
  createMentalHealthRecord,
  updateMentalHealthRecord,
  deleteMentalHealthRecord,
  getMyMentalHealthRecords,
} from "../controllers/mentalHealth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateSchema } from "../validations/schema";
import { mentalHealthSchema } from "../validations/mentalHealth.validation";

const router = express.Router();

/**
 * @route GET /mental-health
 * @description Fetch all mental health records
 */
router.get("/", authenticate, getAllMentalHealthRecords);

/**
 * @route GET /mental-health/my
 * @description Fetch mental health records for the authenticated user
 */
router.get("/my", authenticate, getMyMentalHealthRecords);

/**
 * @route GET /mental-health/:id
 * @description Fetch a specific mental health record by ID
 */
router.get("/:id", authenticate, getMentalHealthRecordById);

/**
 * @route POST /mental-health
 * @description Create a new mental health record
 */
router.post(
  "/",
  authenticate,
  validateSchema(mentalHealthSchema.create),
  createMentalHealthRecord
);

/**
 * @route PUT /mental-health/:id
 * @description Update a mental health record
 */
router.put(
  "/:id",
  authenticate,
  validateSchema(mentalHealthSchema.update),
  updateMentalHealthRecord
);

/**
 * @route DELETE /mental-health/:id
 * @description Delete a mental health record
 */
router.delete("/:id", authenticate, deleteMentalHealthRecord);

export default router;
