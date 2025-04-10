import type { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../Utils/catchAsync.js";
import { Command } from "../../../Models/logs.model.js";
import { ApiFeatures } from "../../../Utils/api.features.js";
import { OkResponseStrategy } from "../../response.controller.js";

export const getLog = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasksWithQueries = new ApiFeatures(Command.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const finalTasks = await tasksWithQueries.query;
    new OkResponseStrategy().handleResponse(res, { info: finalTasks });
  }
);
