import { Request, Response } from "express";
import Discipline from "../models/discipline.model";
import logger from "../../config/logger";

/**
 * @route GET /disciplines
 * @description Fetch all disciplines
 */
export const getAllDisciplines = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const disciplines = await Discipline.find();
    res.status(200).json(disciplines);
  } catch (error) {
    logger.error("Error fetching disciplines: %o", error);
    res.status(500).json({ error: "Failed to fetch disciplines." });
  }
};

/**
 * @route POST /disciplines
 * @description Create a new discipline
 */
export const createDiscipline = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { distance, unit } = req.body;

    const newDiscipline = new Discipline({ distance, unit });
    const savedDiscipline = await newDiscipline.save();
    res.status(201).json(savedDiscipline);
  } catch (error) {
    logger.error("Error creating discipline: %o", error);
    res.status(500).json({ error: "Failed to create discipline." });
  }
};

/**
 * @route PUT /disciplines/:id
 * @description Update an existing discipline
 */
export const updateDiscipline = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { distance, unit } = req.body;
    const { id } = req.params;

    const updatedDiscipline = await Discipline.findByIdAndUpdate(
      id,
      { distance, unit },
      { new: true, runValidators: true }
    );

    if (!updatedDiscipline) {
      res.status(404).json({ error: "Discipline not found." });
      return;
    }

    res.status(200).json(updatedDiscipline);
  } catch (error) {
    logger.error("Error updating discipline: %o", error);
    res.status(500).json({ error: "Failed to update discipline." });
  }
};

/**
 * @route DELETE /disciplines/:id
 * @description Delete a discipline by ID
 */
export const deleteDiscipline = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedDiscipline = await Discipline.findByIdAndDelete(req.params.id);
    if (!deletedDiscipline) {
      res.status(404).json({ error: "Discipline not found." });
      return;
    }

    res.status(200).json({ message: "Discipline deleted successfully." });
  } catch (error) {
    logger.error("Error deleting discipline: %o", error);
    res.status(500).json({ error: "Failed to delete discipline." });
  }
};
