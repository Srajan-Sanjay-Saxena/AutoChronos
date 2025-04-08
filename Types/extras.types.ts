import type { Application, NextFunction , Request , Response } from "express";

export type ResData =
  | {
      [key: string]: any;
    }
  | undefined;

  export interface ModifiedRequest extends Request {
    app: Application;
  }

  export type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;