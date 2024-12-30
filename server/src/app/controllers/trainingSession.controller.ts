import mongoose from "mongoose";
import TrainingSession from "../models/trainingSession.model";
import TrainingPlan from "../models/trainingPlan.model";
import User from "../models/user.model";
import logger from "../../config/logger";
import { Request, Response } from "express";
import { IRole } from "../models/role.model";

/**
 * @route GET /training-sessions
 * @description Fetches all training sessions with populated plan, athlete (user), and coach (user).
 * @response {200} - List of training sessions
 * @response {500} - Internal server error
 */
export const getAllTrainingSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    logger.info("Fetching all training sessions...");

    const sessions = await TrainingSession.find()
      .populate("plan") // Populate with plan name and type
      .populate("athlete", "firstName lastName")
      .populate("coach", "firstName lastName");

    logger.info(`Fetched ${sessions.length} training sessions.`);
    res.status(200).json(sessions);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error fetching training sessions:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while fetching training sessions.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route GET /training-sessions/me
 * @description Fetch all training sessions for the logged-in user (as coach or athlete)
 * @response {200} - List of training sessions
 * @response {500} - Internal server error
 */
export const getMyTrainingSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user; // `req.user` now contains the full user object
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    logger.info(`Fetching training sessions for user: ${user._id}`);

    // Determine query based on role
    const query =
      user.role.name === "coach" ? { coach: user._id } : { athlete: user._id };

    const sessions = await TrainingSession.find(query)
      .populate("plan") // Populate training plan details
      .populate("coach", "firstName lastName") // Populate coach details
      .populate("athlete", "firstName lastName"); // Populate athlete details

    logger.info(
      `Fetched ${sessions.length} training sessions for user: ${user._id}`
    );
    res.status(200).json(sessions);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error fetching training sessions:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while fetching training sessions.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route GET /training-sessions/:id
 * @description Fetches a specific training session by ID.
 * @param {string} id - Training session ID
 * @response {200} - The requested training session
 * @response {404} - Not found
 * @response {500} - Internal server error
 */
export const getTrainingSessionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    logger.info(`Fetching training session with ID: ${req.params.id}`);

    const session = await TrainingSession.findById(req.params.id)
      .populate("plan", "name type")
      .populate("athlete", "user")
      .populate("coach", "user");

    if (!session) {
      res.status(404).json({ message: "Training session not found" });
      return;
    }

    logger.info("Successfully fetched training session.");
    res.status(200).json(session);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error fetching training session:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while fetching training session.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route POST /training-sessions
 * @description Creates a new training session.
 * @bodyParam {string} plan - Training plan ID
 * @bodyParam {string} athlete - Athlete user ID
 * @bodyParam {string} coach - Coach user ID
 * @bodyParam {Date} date - Date of the session
 * @bodyParam {number} iteration - Iteration number
 * @response {201} - Training session created
 * @response {400} - Bad request
 * @response {500} - Internal server error
 */
export const createTrainingSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newSession = new TrainingSession(req.body);
    const session = await newSession.save();
    logger.debug(`Created session: ${JSON.stringify(session)}`);

    logger.info("Successfully created training session:", session._id);
    res.status(201).json(session);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error creating training session:", error.message);
      res.status(400).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while creating training session.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route PUT /training-sessions/:id
 * @description Updates an existing training session.
 * @param {string} id - Training session ID
 * @bodyParam {Object} - Fields to update
 * @response {200} - Training session updated
 * @response {404} - Not found
 * @response {500} - Internal server error
 */
export const updateTrainingSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const session = await TrainingSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!session) {
      res.status(404).json({ message: "Training session not found" });
      return;
    }

    logger.info("Successfully updated training session:", session._id);
    res.status(200).json(session);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error updating training session:", error.message);
      res.status(400).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while updating training session.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route DELETE /training-sessions/:id
 * @description Deletes a training session by ID.
 * @param {string} id - Training session ID
 * @response {200} - Training session deleted
 * @response {404} - Not found
 * @response {500} - Internal server error
 */
export const deleteTrainingSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const session = await TrainingSession.findByIdAndDelete(req.params.id);

    if (!session) {
      res.status(404).json({ message: "Training session not found" });
      return;
    }

    logger.info(
      `Successfully deleted training session with ID: ${req.params.id}`
    );
    res.status(200).json({ message: "Training session deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error deleting training session:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while deleting training session.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route POST /training-sessions/assign-plan
 * @description Assigns a training plan to multiple competitors, creating separate sessions for each.
 * @bodyParam {string} planId - Training plan ID
 * @bodyParam {string[]} competitorIds - Array of competitor user IDs
 * @bodyParam {string} coachId - Coach user ID
 * @bodyParam {Date} date - Date of the session
 * @response {200} - Success message with created sessions
 * @response {400} - Bad request
 * @response {500} - Internal server error
 */
export const assignPlanToCompetitors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { planId, competitorIds, coachId, date, iteration = 1 } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(planId)) {
      res.status(400).json({ message: "Invalid training plan ID." });
      return;
    }
    if (
      !competitorIds ||
      !Array.isArray(competitorIds) ||
      competitorIds.length === 0
    ) {
      res
        .status(400)
        .json({ message: "Competitor IDs must be an array and not empty." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(coachId)) {
      res.status(400).json({ message: "Invalid coach ID." });
      return;
    }
    if (!date || isNaN(new Date(date).getTime())) {
      res.status(400).json({ message: "Invalid date." });
      return;
    }

    // Check if the training plan exists
    const trainingPlan = await TrainingPlan.findById(planId);
    if (!trainingPlan) {
      res.status(404).json({ message: "Training plan not found." });
      return;
    }

    const sessions = [];
    for (const competitorId of competitorIds) {
      if (!mongoose.Types.ObjectId.isValid(competitorId)) {
        logger.warn(`Invalid competitor ID: ${competitorId}`);
        continue;
      }

      // Validate competitor
      const competitor = await User.findById(competitorId).populate<{
        role: IRole;
      }>("role");
      if (!competitor) {
        logger.warn(`Competitor not found: ${competitorId}`);
        continue;
      }
      if (!competitor.role || competitor.role.name !== "competitor") {
        logger.warn(`User is not a competitor: ${competitorId}`);
        continue;
      }

      // Create a session for the competitor
      const session = new TrainingSession({
        plan: planId,
        athlete: competitorId,
        coach: coachId,
        date,
        iteration,
        status: "upcoming",
      });
      await session.save();
      sessions.push(session);
    }

    logger.info(`Created ${sessions.length} training sessions.`);
    res.status(200).json({ message: "Training sessions created.", sessions });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error assigning training plan:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while assigning training plan.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};

/**
 * @route PUT /training-sessions/:id/results
 * @description Updates the results of a training session.
 * @param {string} id - Training session ID
 * @bodyParam {Object} results - Results data to update
 * @response {200} - Training session updated with results
 * @response {404} - Not found
 * @response {500} - Internal server error
 */
export const updateTrainingSessionResults = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { results } = req.body;
    logger.info(`Updating results for session: ${id}`);
    logger.debug(`Results data: ${JSON.stringify(results)}`);
    // Validate results data
    const requiredFields = [
      "HRrest",
      "duration",
      "distance",
      "RPE",
      "HRavg",
      "HRmax",
      "timeInZones",
    ];
    const missingFields = requiredFields.filter(
      (field) => results[field] === undefined || results[field] === null
    );

    if (missingFields.length > 0) {
      logger.warn(
        `Missing fields in results for session ${id}: ${missingFields.join(", ")}`
      );
      res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
      return;
    }

    if (
      !Array.isArray(results.timeInZones) ||
      results.timeInZones.length !== 5
    ) {
      logger.warn(`Invalid or incomplete timeInZones for session ${id}`);
      res.status(400).json({
        message: "Invalid timeInZones. Must be an array of 5 numbers.",
      });
      return;
    }

    const session = await TrainingSession.findById(id);

    if (!session) {
      res.status(404).json({ message: "Session not found." });
      return;
    }

    // Log current session state
    logger.info(`Updating results for session: ${id}`);
    logger.debug(`Current session data: ${JSON.stringify(session.results)}`);
    logger.debug(`New results: ${JSON.stringify(results)}`);

    session.results = results;
    session.status = "completed";
    await session.save();

    logger.info(`Successfully updated session ${id} with new results.`);
    res.status(200).json(session);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Error updating session results:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      logger.error("Unknown error occurred while updating session results.");
      res.status(500).json({ error: "Unknown error occurred." });
    }
  }
};
