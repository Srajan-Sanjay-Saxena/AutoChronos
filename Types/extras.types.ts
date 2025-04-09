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

  export type ShellCommands = "touch" | "mkdir" | "rm" | "rm -rf"

  
export type MethodBase = Record<string, (...args: any[]) => any>;
export type VirtualBase = Record<string, any>;

declare const brand : unique symbol
type Brand<T , TBrand> = T & { [brand] : TBrand }
export type EmailBrand= Brand<string , "Email">