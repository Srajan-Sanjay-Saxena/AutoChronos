import type { NextFunction, Request, Response } from "express";
import { type AsyncHandler, type ModifiedRequest } from "../Types/extras.types.js";

export const catchAsync = (fn: AsyncHandler) => {
  return (
    req: Request | ModifiedRequest,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
