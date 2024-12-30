import { Request, Response } from "express";
import MentalHealth from "../models/mentalHealth.model";
import logger from "../../config/logger";
import jwt from "jsonwebtoken";

/**
 * @route GET /mental-health
 * @description Fetch all mental health records
 */
export const getAllMentalHealthRecords = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const records = await MentalHealth.find().populate(
      "user",
      "firstName lastName email"
    );
    res.status(200).json(records);
  } catch (error) {
    logger.error("Error fetching mental health records: %o", error);
    res.status(500).json({ error: "Failed to fetch records." });
  }
};

/**
 * @route GET /mental-health/my
 * @description Fetch the mental health records for the logged-in user
 */
export const getMyMentalHealthRecords = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "User not authenticated." });
      return;
    }

    const records = await MentalHealth.find({ user: user._id }).select(
      "moodRating sleepQuality pulse date createdAt"
    );

    res.status(200).json(records);
  } catch (error) {
    logger.error("Error fetching user mental health records: %o", error);
    res.status(500).json({ error: "Failed to fetch records." });
  }
};

/**
 * @route GET /mental-health/:id
 * @description Fetch a single mental health record by ID
 */
export const getMentalHealthRecordById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const record = await MentalHealth.findById(req.params.id).populate("user");
    if (!record) {
      res.status(404).json({ error: "Record not found." });
      return;
    }
    res.status(200).json(record);
  } catch (error) {
    logger.error("Error fetching mental health record: %o", error);
    res.status(500).json({ error: "Failed to fetch record." });
  }
};

/**
 * @route POST /mental-health
 * @description Create a new mental health record
 */
export const createMentalHealthRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { moodRating, sleepQuality, pulse, adminOverride } = req.body;
    const user = req.user; // Automatically extract user from req.user

    if (!user) {
      res.status(401).json({ error: "User not authenticated." });
      return;
    }

    const newRecord = new MentalHealth({
      user: user._id, // Attach user from request
      moodRating,
      sleepQuality,
      pulse,
      adminOverride,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    logger.error("Error creating mental health record: %o", error);
    res.status(500).json({ error: "Failed to create record." });
  }
};

/**
 * @route PUT /mental-health/:id
 * @description Update an existing mental health record
 */
export const updateMentalHealthRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { moodRating, sleepQuality, pulse, adminOverride } = req.body;

    const updatedRecord = await MentalHealth.findByIdAndUpdate(
      req.params.id,
      { moodRating, sleepQuality, pulse, adminOverride },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      res.status(404).json({ error: "Record not found." });
      return;
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    logger.error("Error updating mental health record: %o", error);
    res.status(500).json({ error: "Failed to update record." });
  }
};

/**
 * @route DELETE /mental-health/:id
 * @description Delete a mental health record
 */
export const deleteMentalHealthRecord = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedRecord = await MentalHealth.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      res.status(404).json({ error: "Record not found." });
      return;
    }

    res.status(200).json({ message: "Record deleted successfully." });
  } catch (error) {
    logger.error("Error deleting mental health record: %o", error);
    res.status(500).json({ error: "Failed to delete record." });
  }
};
