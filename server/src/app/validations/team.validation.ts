import Joi from "joi";

const teamSchema = Joi.object({
  name: Joi.string().required(),
  coach: Joi.string().required(),
  members: Joi.array().items(Joi.string()).required(),
});
