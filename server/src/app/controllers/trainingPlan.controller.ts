import mongoose from "mongoose";
import TrainingPlan from "../models/trainingPlan.model";
import logger from "../../config/logger";
import { Request, Response } from "express";

/**
 * @route GET /training-plans
 * @description Fetches all training plans.
 * @response {200} - List of training plans
 * @response {500} - Internal server error
 */
const getAllTrainingPlans = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    logger.info("Fetching all training plans...");

    const plans = await TrainingPlan.find();

    logger.info(`Fetched ${plans.length} training plans.`);
    res.status(200).json(plans);
  } catch (error: unknown) {
    logger.error("Error fetching training plans:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /training-plans/:id
 * @description Fetches a specific training plan by ID.
 */
const getTrainingPlanById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plan = await TrainingPlan.findById(req.params.id);

    if (!plan) {
      logger.warn(`Training plan with ID ${req.params.id} not found.`);
      res.status(404).json({ message: "Training plan not found" });
      return;
    }

    res.status(200).json(plan);
  } catch (error) {
    logger.error("Error fetching training plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route POST /training-plans
 * @description Creates a new training plan.
 */
const createTrainingPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const plans = req.body;
    if (!Array.isArray(plans)) {
      logger.error("Invalid format: Expected an array of plans.");
      res
        .status(400)
        .json({ error: "Invalid format: Expected an array of plans." });
      return;
    }

    for (const plan of plans) {
      if (!plan.name || !Array.isArray(plan.exercises)) {
        logger.error("Invalid training plan structure.");
        res.status(400).json({
          error:
            "Each plan must include name, type, categories, and exercises.",
        });
        return;
      }

      plan.exercises = plan.exercises.map((exercise: any) => {
        // Normalize `variant`
        if (exercise.variant === "strength" || exercise.variant === "cardio") {
          exercise.variant = "gym"; // Backend expects `gym`
        }

        return exercise;
      });
    }

    const createdPlans = await TrainingPlan.insertMany(plans);
    res.status(201).json(createdPlans);
  } catch (error) {
    logger.error("Error creating training plans:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route PUT /training-plans/:id
 * @description Updates an existing training plan.
 */
const updateTrainingPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, exercises } = req.body;

    // Validate exercises structure
    if (exercises && !Array.isArray(exercises)) {
      logger.error("Invalid exercises format.");
      res.status(400).json({ error: "Exercises must be an array." });
      return;
    }

    const updatedPlan = await TrainingPlan.findByIdAndUpdate(
      req.params.id,
      { name, exercises },
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      logger.warn(`Training plan with ID ${req.params.id} not found.`);
      res.status(404).json({ message: "Training plan not found" });
      return;
    }

    logger.info(`Successfully updated training plan: ${updatedPlan._id}`);
    res.status(200).json(updatedPlan);
  } catch (error) {
    logger.error("Error updating training plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route DELETE /training-plans/:id
 * @description Deletes a training plan by ID.
 */
const deleteTrainingPlan = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedPlan = await TrainingPlan.findByIdAndDelete(req.params.id);

    if (!deletedPlan) {
      logger.warn(`Training plan with ID ${req.params.id} not found.`);
      res.status(404).json({ message: "Training plan not found" });
      return;
    }

    logger.info(`Successfully deleted training plan: ${req.params.id}`);
    res.status(200).json({ message: "Training plan deleted successfully" });
  } catch (error) {
    logger.error("Error deleting training plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getAllTrainingPlans,
  getTrainingPlanById,
  createTrainingPlan,
  updateTrainingPlan,
  deleteTrainingPlan,
};
