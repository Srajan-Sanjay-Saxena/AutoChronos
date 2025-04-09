import { Queue } from "bullmq";
import { BadRequest } from "../../../error.controller.js";
import { catchAsync } from "../../../../Utils/catchAsync.js";
import { CreateResponseStrategy } from "../../../response.controller.js";
const emailQueue = new Queue("email-ops", {
    connection: {
        host: "localhost",
        port: 6379,
    },
});
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
//* Cron time operations
const addEmailQueue = catchAsync(async (req, res, next) => {
    const { emailTo, subject, cronTime } = req.body;
    if (!emailTo) {
        return next(new BadRequest().handleResponse(res, {
            info: "Email recipient not given",
        }));
    }
    else if (!cronTime) {
        return next(new BadRequest().handleResponse(res, { info: "Cron time not given" }));
    }
    const finalSubject = subject || "Disk Usage";
    const job = await emailQueue.add("email-service", {
        emailTo,
        finalSubject,
        cronTime,
    });
    new CreateResponseStrategy().handleResponse(res, {
        info: "Job added successfully to email queue",
        id: job.id,
    });
});
//* One time operations
const addWriteOpsQueue = catchAsync(async (req, res, next) => {
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
        return next(new BadRequest().handleResponse(res, { info: "Target name not given" }));
    if (!taskName.includes(userTaskName))
        return next(new BadRequest().handleResponse(res, {
            info: "Invalid crud operation given",
        }));
    const job = await writeOpsQueue.add(userTaskName, { pathName });
    new CreateResponseStrategy().handleResponse(res, {
        info: "Job added successfully to write-ops queue",
        id: job.id,
    });
});
const addReadOpsQueue = catchAsync(async (req, res, next) => {
    const taskName = ["lsDir", "history", "fileRead"];
    const userTaskName = req.body.taskName;
    const pathName = req.body.targetName;
    let job;
    if (!taskName.includes(userTaskName))
        return next(new BadRequest().handleResponse(res, {
            info: "Invalid crud operation given",
        }));
    switch (userTaskName) {
        case "lsDir":
            if (!pathName)
                return next(new BadRequest().handleResponse(res, {
                    info: "Target name not given",
                }));
            job = await readOpsQueue.add("listing-directory", { pathName });
            break;
        case "history":
            job = await readOpsQueue.add("command-history", {});
            break;
        case "fileRead":
            if (!pathName)
                return next(new BadRequest().handleResponse(res, {
                    info: "Target name not given",
                }));
            job = await readOpsQueue.add("file-read", { pathName });
            break;
        default:
            return next(new BadRequest().handleResponse(res, {
                info: "None of job matches our servings",
            }));
    }
    new CreateResponseStrategy().handleResponse(res, {
        info: "Job added successfully to read-ops queue",
        id: job.id,
    });
});
export default { addEmailQueue, addReadOpsQueue, addWriteOpsQueue };
