import Joi from "joi";

export const disciplineSchema = {
  create: Joi.object({
    distance: Joi.number().positive().required().messages({
      "number.base": "Distance must be a number.",
      "number.positive": "Distance must be a positive value.",
      "any.required": "Distance is required.",
    }),
    unit: Joi.string().valid("m", "km").required().messages({
      "string.base": "Unit must be a string.",
      "any.only": "Unit must be either 'm' or 'km'.",
      "any.required": "Unit is required.",
    }),
  }),

  update: Joi.object({
    distance: Joi.number().positive().messages({
      "number.base": "Distance must be a number.",
      "number.positive": "Distance must be a positive value.",
    }),
    unit: Joi.string().valid("m", "km").messages({
      "string.base": "Unit must be a string.",
      "any.only": "Unit must be either 'm' or 'km'.",
    }),
  }),
};
