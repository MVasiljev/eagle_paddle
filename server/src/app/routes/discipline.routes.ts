import express from "express";
import {
  getAllDisciplines,
  createDiscipline,
  updateDiscipline,
  deleteDiscipline,
} from "../controllers/discipline.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateSchema } from "../validations/schema";
import { disciplineSchema } from "../validations/discipline.validation";

const router = express.Router();

/**
 * @route GET /disciplines
 * @description Fetch all disciplines
 */
router.get("/", authenticate, getAllDisciplines);

/**
 * @route POST /disciplines
 * @description Create a new discipline
 */
router.post(
  "/",
  authenticate,
  validateSchema(disciplineSchema.create),
  createDiscipline
);

/**
 * @route PUT /disciplines/:id
 * @description Update an existing discipline
 */
router.put(
  "/:id",
  authenticate,
  validateSchema(disciplineSchema.update),
  updateDiscipline
);

/**
 * @route DELETE /disciplines/:id
 * @description Delete a discipline by ID
 */
router.delete("/:id", authenticate, deleteDiscipline);

export default router;
