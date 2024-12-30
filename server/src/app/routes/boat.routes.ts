import express from "express";
import {
  getAllBoats,
  createBoat,
  deleteBoat,
} from "../controllers/boat.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateSchema } from "../validations/schema";
import { boatSchema } from "../validations/boat.validation";

const router = express.Router();

/**
 * @route GET /boats
 * @description Fetch all boats
 */
router.get("/", authenticate, getAllBoats);

/**
 * @route POST /boats
 * @description Create a new boat
 */
router.post("/", authenticate, validateSchema(boatSchema.create), createBoat);

/**
 * @route DELETE /boats/:id
 * @description Delete a boat by ID
 */
router.delete("/:id", authenticate, deleteBoat);

export default router;
