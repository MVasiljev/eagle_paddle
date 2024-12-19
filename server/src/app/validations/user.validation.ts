import Joi, { ObjectSchema } from "joi";

export const updateUserSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().optional().messages({
    "string.base": "First name must be a string.",
  }),
  lastName: Joi.string().optional().messages({
    "string.base": "Last name must be a string.",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email must be a string.",
    "string.email": "Invalid email format.",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least 6 characters.",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Role must be a string.",
  }),
});

export const approveUserSchema: ObjectSchema = Joi.object({
  approved: Joi.boolean().required().messages({
    "boolean.base": "'approved' must be a boolean value.",
    "any.required": "'approved' is required.",
  }),
  roleId: Joi.string().required().messages({
    "string.base": "'roleId' must be a string.",
    "any.required": "'roleId' is required.",
  }),
});
