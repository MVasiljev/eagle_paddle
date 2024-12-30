import Joi from "joi";

export const clubSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    athletes: Joi.array().items(Joi.string()).optional(),
    coaches: Joi.array().items(Joi.string()).optional(),
  }),

  update: Joi.object({
    name: Joi.string().optional(),
    location: Joi.string().optional(),
    athletes: Joi.array().items(Joi.string()).optional(),
    coaches: Joi.array().items(Joi.string()).optional(),
  }),
};
