import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const isObjectId = (value: string) =>
  mongoose.Types.ObjectId.isValid(value);
