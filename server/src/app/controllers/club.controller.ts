import { Request, Response } from "express";
import Club from "../models/club.model";
import User, { IUser } from "../models/user.model";
import logger from "../../config/logger";

/**
 * @route GET /clubs
 * @description Fetch all clubs
 */
export const getAllClubs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const clubs = await Club.find()
      .populate("athletes", "firstName lastName email")
      .populate("coaches", "firstName lastName email");
    res.status(200).json(clubs);
  } catch (error) {
    logger.error("Error fetching clubs: %o", error);
    res.status(500).json({ error: "Failed to fetch clubs." });
  }
};

/**
 * @route GET /clubs/:id
 * @description Fetch a single club by ID
 */
export const getClubById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const club = await Club.findById(req.params.id)
      .populate("athletes")
      .populate("coaches");
    if (!club) {
      res.status(404).json({ error: "Club not found." });
      return;
    }
    res.status(200).json(club);
  } catch (error) {
    logger.error("Error fetching club: %o", error);
    res.status(500).json({ error: "Failed to fetch club." });
  }
};

/**
 * @route POST /clubs
 * @description Create a new club
 */
export const createClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, location, athletes = [], coaches = [] } = req.body;

    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      res.status(400).json({ error: "Club with this name already exists." });
      return;
    }

    // Only check athlete/coach existence if lists are not empty
    let athleteUsers: IUser[] = [];
    let coachUsers: IUser[] = [];

    if (athletes.length) {
      athleteUsers = await User.find({ _id: { $in: athletes } });
      if (athleteUsers.length !== athletes.length) {
        res.status(400).json({ error: "Some athletes not found." });
        return;
      }
    }

    if (coaches.length) {
      coachUsers = await User.find({ _id: { $in: coaches } });
      if (coachUsers.length !== coaches.length) {
        res.status(400).json({ error: "Some coaches not found." });
        return;
      }
    }

    // Create new club with empty athletes and coaches arrays if not provided
    const newClub = new Club({ name, location, athletes, coaches });
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (error) {
    logger.error("Error creating club: %o", error);
    res.status(500).json({ error: "Failed to create club." });
  }
};

/**
 * @route PUT /clubs/:id
 * @description Update an existing club
 */
export const updateClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, location, athletes, coaches } = req.body;

    if (athletes) {
      const athleteUsers = await User.find({ _id: { $in: athletes } });
      if (athleteUsers.length !== athletes.length) {
        res.status(400).json({ error: "Some athletes not found." });
        return;
      }
    }

    if (coaches) {
      const coachUsers = await User.find({ _id: { $in: coaches } });
      if (coachUsers.length !== coaches.length) {
        res.status(400).json({ error: "Some coaches not found." });
        return;
      }
    }

    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      { name, location, athletes, coaches },
      { new: true, runValidators: true }
    )
      .populate("athletes")
      .populate("coaches");

    if (!updatedClub) {
      res.status(404).json({ error: "Club not found." });
      return;
    }

    res.status(200).json(updatedClub);
  } catch (error) {
    logger.error("Error updating club: %o", error);
    res.status(500).json({ error: "Failed to update club." });
  }
};

/**
 * @route DELETE /clubs/:id
 * @description Delete a club
 */
export const deleteClub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);
    if (!deletedClub) {
      res.status(404).json({ error: "Club not found." });
      return;
    }

    res.status(200).json({ message: "Club deleted successfully." });
  } catch (error) {
    logger.error("Error deleting club: %o", error);
    res.status(500).json({ error: "Failed to delete club." });
  }
};
