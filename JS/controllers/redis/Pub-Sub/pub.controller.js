import { catchAsync } from "../../../Utils/catchAsync.js";
import { BadRequest } from "../../error.controller.js";
import { redisPub } from "../../../App/worker.pub-sub.js";
import { CreateResponseStrategy } from "../../response.controller.js";
//* Cron time operations
export const emailRequestBroadcaster = catchAsync(async (req, res, next) => {
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
    await redisPub.publish("sendEmail-task", JSON.stringify({
        emailTo,
        finalSubject,
        cronTime,
    }));
    new CreateResponseStrategy().handleResponse(res, {
        info: "Email task broadcasted to all workers....",
    });
});
