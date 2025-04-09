import { catchAsync } from "../Utils/catchAsync.js";
import type { Response, NextFunction } from "express";
import type { ModifiedRequest } from "../Types/extras.types.js";


export const getlog = catchAsync(
  async (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const timestamp = new Date().getTime();
    const machineId = 'thisisamachineid';
    const command = 'touch C:/Users/Desktop/file.txt';
    console.log(timestamp);
    const item = {
        time: timestamp,
        machine: machineId,
        command: command};
    let result = {};
    for (let i = 0; i < 10; i++) {
        result[i] = item;
    }
    res.send(result);
  }
);