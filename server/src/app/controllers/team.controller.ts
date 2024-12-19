import { Request, Response } from "express";
import Team from "../models/team.model";
import User from "../models/user.model";
import logger from "../../config/logger";

/**
 * @route GET /teams
 * @description Fetch all teams or teams of the logged-in coach
 */
export const getAllTeams = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user; // Assuming `req.user` contains the authenticated user's ID
    const { myTeams } = req.query; // Optional query param to filter by coach

    let query = {};

    if (myTeams && userId) {
      query = { coach: userId }; // Fetch only the teams where the coach matches the logged-in user
    }

    const teams = await Team.find(query).populate("coach").populate("members");
    res.status(200).json(teams);
  } catch (error) {
    logger.error("Error fetching teams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /teams/:id
 * @description Fetch a team by ID
 */
export const getTeamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("coach")
      .populate("members");

    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    res.status(200).json(team);
  } catch (error) {
    logger.error("Error fetching team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route POST /teams
 * @description Create a new team
 */
export const createTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, coach, members } = req.body;

    // Validate coach
    const coachUser = await User.findById(coach);
    if (!coachUser) {
      res.status(400).json({ error: "Coach not found" });
      return;
    }

    // Validate members
    const memberUsers = await User.find({ _id: { $in: members } });
    if (memberUsers.length !== members.length) {
      res.status(400).json({ error: "Some members not found" });
      return;
    }

    const newTeam = new Team({ name, coach, members });
    const savedTeam = await newTeam.save();

    res.status(201).json(savedTeam);
  } catch (error) {
    logger.error("Error creating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route PUT /teams/:id
 * @description Update a team
 */
export const updateTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, members } = req.body;

    // Validate members
    if (members) {
      const memberUsers = await User.find({ _id: { $in: members } });
      if (memberUsers.length !== members.length) {
        res.status(400).json({ error: "Some members not found" });
        return;
      }
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name, members },
      { new: true, runValidators: true }
    )
      .populate("coach")
      .populate("members");

    if (!updatedTeam) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    logger.error("Error updating team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route DELETE /teams/:id
 * @description Delete a team
 */
export const deleteTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);

    if (!deletedTeam) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    logger.error("Error deleting team:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
