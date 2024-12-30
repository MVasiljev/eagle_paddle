import { Request, Response } from "express";
import Boat from "../models/boat.model";
import logger from "../../config/logger";

/**
 * @route GET /boats
 * @description Fetch all boats
 */
export const getAllBoats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boats = await Boat.find();
    res.status(200).json(boats);
  } catch (error) {
    logger.error("Error fetching boats: %o", error);
    res.status(500).json({ error: "Failed to fetch boats." });
  }
};

/**
 * @route POST /boats
 * @description Create a new boat
 */
export const createBoat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    const existingBoat = await Boat.findOne({ name });
    if (existingBoat) {
      res.status(400).json({ error: "Boat with this name already exists." });
      return;
    }

    const newBoat = new Boat({ name });
    const savedBoat = await newBoat.save();
    res.status(201).json(savedBoat);
  } catch (error) {
    logger.error("Error creating boat: %o", error);
    res.status(500).json({ error: "Failed to create boat." });
  }
};

/**
 * @route DELETE /boats/:id
 * @description Delete a boat by ID
 */
export const deleteBoat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedBoat = await Boat.findByIdAndDelete(req.params.id);
    if (!deletedBoat) {
      res.status(404).json({ error: "Boat not found." });
      return;
    }

    res.status(200).json({ message: "Boat deleted successfully." });
  } catch (error) {
    logger.error("Error deleting boat: %o", error);
    res.status(500).json({ error: "Failed to delete boat." });
  }
};
