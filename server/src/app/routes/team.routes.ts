import { Router } from "express";
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /teams
 * @description Fetch all teams
 */
router.get("/teams", authenticate, getAllTeams);

/**
 * @route GET /teams/:id
 * @description Fetch a team by ID
 */
router.get("/:id", getTeamById);

/**
 * @route POST /teams
 * @description Create a new team
 */
router.post("/", createTeam);

/**
 * @route PUT /teams/:id
 * @description Update a team
 */
router.put("/:id", updateTeam);

/**
 * @route DELETE /teams/:id
 * @description Delete a team
 */
router.delete("/:id", deleteTeam);

export default router;
