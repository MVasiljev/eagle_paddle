import Joi from "joi";

export const boatSchema = {
  create: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Boat name must be a string.",
      "string.empty": "Boat name is required.",
    }),
  }),
};
