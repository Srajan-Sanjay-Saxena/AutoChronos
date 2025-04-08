import type { Application, NextFunction , Request , Response } from "express";

export type ResData =
  | {
      [key: string]: any;
    }
  | undefined;

  export interface ModifiedRequest extends Request {
    filename : string
  }

  export type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;

  type ShellCommands = "touch" | "mkdir" | "rm" | "rm -rf"