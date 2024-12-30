import Joi from "joi";

export const trainingTypeSchema = {
  create: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Training type name must be a string.",
      "string.empty": "Training type name is required.",
    }),
    variant: Joi.string()
      .valid("standard", "strength", "cardio")
      .required()
      .messages({
        "any.only": "Variant must be 'standard', 'strength', or 'cardio'.",
      }),
    categories: Joi.array().items(Joi.string()).required().messages({
      "array.base": "Categories must be an array of strings.",
    }),
    exercises: Joi.alternatives()
      .conditional("variant", {
        is: Joi.valid("strength", "cardio"),
        then: Joi.array().items(Joi.string()).min(1).required(),
        otherwise: Joi.forbidden(), // Don't allow exercises for standard
      })
      .messages({
        "array.base": "Exercises must be an array of strings.",
        "array.min":
          "At least one exercise is required for strength or cardio.",
      }),
  }),

  update: Joi.object({
    name: Joi.string().optional().messages({
      "string.base": "Training type name must be a string.",
    }),
    variant: Joi.string()
      .valid("standard", "strength", "cardio")
      .optional()
      .messages({
        "any.only": "Variant must be 'standard', 'strength', or 'cardio'.",
      }),
    categories: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Categories must be an array of strings.",
    }),
    exercises: Joi.alternatives()
      .conditional("variant", {
        is: Joi.valid("strength", "cardio"),
        then: Joi.array().items(Joi.string()).min(1),
        otherwise: Joi.forbidden(),
      })
      .messages({
        "array.base": "Exercises must be an array of strings.",
      }),
  }),
};
