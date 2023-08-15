import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validationMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ errors: error.details });
    } else {
      // Data is valid, proceed to the next middleware
      next();
    }
  };
};
