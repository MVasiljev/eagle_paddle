import Joi, { ObjectSchema } from "joi";

export const updateUserSchema: ObjectSchema = Joi.object({
  firstName: Joi.string().optional().messages({
    "string.base": "Ime mora biti tekst.",
  }),
  lastName: Joi.string().optional().messages({
    "string.base": "Prezime mora biti tekst.",
  }),
  email: Joi.string().email().optional().messages({
    "string.base": "Email mora biti tekst.",
    "string.email": "Neispravan format email adrese.",
  }),
  password: Joi.string().min(6).optional().messages({
    "string.base": "Lozinka mora biti tekst.",
    "string.min": "Lozinka mora imati najmanje 6 karaktera.",
  }),
  role: Joi.string().optional().messages({
    "string.base": "Uloga mora biti tekst.",
  }),
  height: Joi.number().optional().messages({
    "number.base": "Visina mora biti broj.",
  }),
  approved: Joi.boolean().forbidden().messages({
    "any.unknown": "Polje 'approved' nije dozvoljeno za ovu operaciju.",
  }),
  _id: Joi.forbidden().messages({
    "any.unknown": "Polje '_id' nije dozvoljeno za ažuriranje.",
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
