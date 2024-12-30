import { Request, Response } from "express";
import TrainingType from "../models/trainingType.model";
import logger from "../../config/logger";

/**
 * @route GET /training-types
 * @description Fetch all training types
 */
export const getAllTrainingTypes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const types = await TrainingType.find();
    res.status(200).json(types);
  } catch (error) {
    logger.error("Error fetching training types: %o", error);
    res.status(500).json({ error: "Failed to fetch training types." });
  }
};

/**
 * @route GET /training-types/:id
 * @description Fetch a training type by ID
 */
export const getTrainingTypeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const type = await TrainingType.findById(req.params.id);
    if (!type) {
      res.status(404).json({ error: "Training type not found." });
      return;
    }
    res.status(200).json(type);
  } catch (error) {
    logger.error("Error fetching training type: %o", error);
    res.status(500).json({ error: "Failed to fetch training type." });
  }
};

/**
 * @route POST /training-types
 * @description Create a new training type
 */
export const createTrainingType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, variant, categories } = req.body;

    const existingType = await TrainingType.findOne({ name });
    if (existingType) {
      res
        .status(400)
        .json({ error: "Training type with this name already exists." });
      return;
    }

    const newType = new TrainingType({ name, variant, categories });
    const savedType = await newType.save();
    res.status(201).json(savedType);
  } catch (error) {
    logger.error("Error creating training type: %o", error);
    res.status(500).json({ error: "Failed to create training type." });
  }
};

/**
 * @route PUT /training-types/:id
 * @description Update an existing training type
 */
export const updateTrainingType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, variant, categories } = req.body;

    const updatedType = await TrainingType.findByIdAndUpdate(
      req.params.id,
      { name, variant, categories },
      { new: true, runValidators: true }
    );

    if (!updatedType) {
      res.status(404).json({ error: "Training type not found." });
      return;
    }

    res.status(200).json(updatedType);
  } catch (error) {
    logger.error("Error updating training type: %o", error);
    res.status(500).json({ error: "Failed to update training type." });
  }
};

/**
 * @route DELETE /training-types/:id
 * @description Delete a training type
 */
export const deleteTrainingType = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedType = await TrainingType.findByIdAndDelete(req.params.id);
    if (!deletedType) {
      res.status(404).json({ error: "Training type not found." });
      return;
    }

    res.status(200).json({ message: "Training type deleted successfully." });
  } catch (error) {
    logger.error("Error deleting training type: %o", error);
    res.status(500).json({ error: "Failed to delete training type." });
  }
};
