import express from "express";
import {
  getAllTrainingSessions,
  getTrainingSessionById,
  createTrainingSession,
  updateTrainingSession,
  deleteTrainingSession,
  assignPlanToCompetitors,
  updateTrainingSessionResults,
  getMyTrainingSessions,
} from "../controllers/trainingSession.controller";
import { authenticate, authorizeRole } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/me", authenticate, getMyTrainingSessions);

/**
 * @route GET /training-sessions
 * @description Fetches all training sessions with populated plan, athlete (user), and coach (user).
 * @response {200} - List of training sessions
 */
router.get("/", authenticate, getAllTrainingSessions);

/**
 * @route GET /training-sessions/:id
 * @description Fetches a specific training session by ID.
 * @param {string} id - Training session ID
 * @response {200} - The requested training session
 */
router.get("/:id", authenticate, getTrainingSessionById);

/**
 * @route POST /training-sessions
 * @description Creates a new training session.
 * @bodyParam {string} plan - Training plan ID
 * @bodyParam {string} athlete - Athlete user ID
 * @bodyParam {string} coach - Coach user ID
 * @bodyParam {Date} date - Date of the session
 * @bodyParam {number} iteration - Iteration number
 * @response {201} - Training session created
 */
router.post("/", authenticate, createTrainingSession);

/**
 * @route PUT /training-sessions/:id
 * @description Updates an existing training session.
 * @param {string} id - Training session ID
 * @bodyParam {Object} - Fields to update
 * @response {200} - Training session updated
 */
router.put("/:id", authenticate, updateTrainingSession);

/**
 * @route DELETE /training-sessions/:id
 * @description Deletes a training session by ID.
 * @param {string} id - Training session ID
 * @response {200} - Training session deleted
 */
router.delete("/:id", authenticate, deleteTrainingSession);

/**
 * @route POST /training-sessions/assign-plan
 * @description Assigns a training plan to a set of competitors.
 * @bodyParam {string} planId - Training plan ID
 * @bodyParam {string[]} competitorIds - Array of competitor user IDs
 * @bodyParam {Date} date - Date of the session
 * @bodyParam {number} iteration - Iteration number
 * @response {200} - Training sessions created for each competitor
 */
router.post("/assign-plan", authenticate, assignPlanToCompetitors);

/**
 * @route PUT /training-sessions/:id/results
 * @description Updates the results of a training session.
 * @param {string} id - Training session ID
 * @bodyParam {Object} results - Results data to update
 * @response {200} - Training session updated with results
 */
router.put("/:id/results", authenticate, updateTrainingSessionResults);

export default router;
