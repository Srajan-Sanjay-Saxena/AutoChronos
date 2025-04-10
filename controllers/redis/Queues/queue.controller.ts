import { Queue } from "bullmq";
import type { Request, Response, NextFunction } from "express";
import { BadRequest } from "../../error.controller.js";
import { catchAsync } from "../../../Utils/catchAsync.js";
import { CreateResponseStrategy } from "../../response.controller.js";




const writeOpsQueue = new Queue("write-ops", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const readOpsQueue = new Queue("read-ops", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});


//* One time operations
const addWriteOpsQueue = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskName = [
      "create-folder",
      "create-file",
      "delete-folder",
      "delete-file",
    ];
    const userTaskName = req.body.taskName;
    const pathName = req.body.targetName;
    console.log("BODY IS:", req.body);
    if (!pathName)
      return next(
        new BadRequest().handleResponse(res, { info: "Target name not given" })
      );
    if (!taskName.includes(userTaskName))
      return next(
        new BadRequest().handleResponse(res, {
          info: "Invalid crud operation given",
        })
      );
      //TODO : Mongo model bana logs ka , 2->model , 1 -->write 2--> read
    const job = await writeOpsQueue.add(userTaskName, { pathName });

    new CreateResponseStrategy().handleResponse(res, {
      info: "Job added successfully to write-ops queue",
      id: job.id,
    });
  }
);
const addReadOpsQueue = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskName = ["lsDir", "history", "fileRead"];
    const userTaskName = req.body.taskName;
    const pathName = req.body.targetName;
    let job;

    if (!taskName.includes(userTaskName))
      return next(
        new BadRequest().handleResponse(res, {
          info: "Invalid crud operation given",
        })
      );
    switch (userTaskName) {
      case "lsDir":
        if (!pathName)
          return next(
            new BadRequest().handleResponse(res, {
              info: "Target name not given",
            })
          );
        job = await readOpsQueue.add("listing-directory", { pathName });
        break;
      case "history":
        job = await readOpsQueue.add("command-history", {});
        break;
      case "fileRead":
        if (!pathName)
          return next(
            new BadRequest().handleResponse(res, {
              info: "Target name not given",
            })
          );
        job = await readOpsQueue.add("file-read", { pathName });
        break;
      default:
        return next(
          new BadRequest().handleResponse(res, {
            info: "None of job matches our servings",
          })
        );
    }

    new CreateResponseStrategy().handleResponse(res, {
      info: "Job added successfully to read-ops queue",
      id: job.id,
    });
  }
);

export default {  addReadOpsQueue, addWriteOpsQueue };
