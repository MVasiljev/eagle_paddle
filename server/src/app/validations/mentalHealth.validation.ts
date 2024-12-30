import Joi from "joi";

export const mentalHealthSchema = {
  create: Joi.object({
    moodRating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Mood rating must be a number.",
      "number.min": "Mood rating must be at least 1.",
      "number.max": "Mood rating cannot exceed 5.",
    }),
    sleepQuality: Joi.number().min(1).max(5).optional(),
    pulse: Joi.number().optional(),
    adminOverride: Joi.boolean().optional(),
  }),

  update: Joi.object({
    moodRating: Joi.number().min(1).max(5).optional(),
    sleepQuality: Joi.number().min(1).max(5).optional(),
    pulse: Joi.number().optional(),
    adminOverride: Joi.boolean().optional(),
  }),
};
