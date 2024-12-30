import express from "express";
import {
  getAllClubs,
  getClubById,
  createClub,
  updateClub,
  deleteClub,
} from "../controllers/club.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { clubSchema } from "../validations/club.validation";
import { validateSchema } from "../validations/schema";

const router = express.Router();

/**
 * @route GET /clubs
 * @description Fetch all clubs
 */
router.get("/", authenticate, getAllClubs);

/**
 * @route GET /clubs/:id
 * @description Fetch a specific club by ID
 */
router.get("/:id", authenticate, getClubById);

/**
 * @route POST /clubs
 * @description Create a new club
 */
router.post("/", authenticate, validateSchema(clubSchema.create), createClub);

/**
 * @route PUT /clubs/:id
 * @description Update a club by ID
 */
router.put("/:id", authenticate, validateSchema(clubSchema.update), updateClub);

/**
 * @route DELETE /clubs/:id
 * @description Delete a club by ID
 */
router.delete("/:id", authenticate, deleteClub);

export default router;
