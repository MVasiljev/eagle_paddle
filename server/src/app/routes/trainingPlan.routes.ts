import express from "express";

import { authenticate, authorizeRole } from "../middlewares/auth.middleware";
import {
  getAllTrainingPlans,
  getTrainingPlanById,
  createTrainingPlan,
  updateTrainingPlan,
  deleteTrainingPlan,
} from "../controllers/trainingPlan.controller";

const router = express.Router();

/**
 * @route GET /training-plans
 * @description Fetches all training plans.
 * @response {200} - List of training plans
 */
router.get("/", authenticate, getAllTrainingPlans);

/**
 * @route GET /training-plans/:id
 * @description Fetches a specific training plan by ID.
 * @param {string} id - Training plan ID
 * @response {200} - The requested training plan
 */
router.get("/:id", authenticate, getTrainingPlanById);

/**
 * @route POST /training-plans
 * @description Creates a new training plan.
 * @bodyParam {string} name - Training plan name
 * @bodyParam {string} type - Type of training plan
 * @bodyParam {Array} categories - List of categories for the plan
 * @response {201} - Training plan created
 */
router.post("/", authenticate, createTrainingPlan);

/**
 * @route PUT /training-plans/:id
 * @description Updates an existing training plan.
 * @param {string} id - Training plan ID
 * @bodyParam {Object} - Fields to update
 * @response {200} - Training plan updated
 */
router.put("/:id", authenticate, updateTrainingPlan);

/**
 * @route DELETE /training-plans/:id
 * @description Deletes a training plan by ID.
 * @param {string} id - Training plan ID
 * @response {200} - Training plan deleted
 */
router.delete("/:id", authenticate, deleteTrainingPlan);

export default router;
