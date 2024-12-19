import Joi from "joi";

export const roleSchema = {
  create: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Role name must be a string.",
      "string.empty": "Role name is required.",
    }),
    permissions: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Permissions must be an array of strings.",
    }),
  }),

  update: Joi.object({
    name: Joi.string().optional().messages({
      "string.base": "Role name must be a string.",
    }),
    permissions: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Permissions must be an array of strings.",
    }),
  }),
};
