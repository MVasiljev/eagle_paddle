import { ObjectSchema } from "joi";

export const validateSchema =
  (schema: ObjectSchema) =>
  (req: any, res: any, next: any): any => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => ({
        message: detail.message,
        path: detail.path,
      }));
      return res.status(400).json({ errors });
    }
    next();
  };
