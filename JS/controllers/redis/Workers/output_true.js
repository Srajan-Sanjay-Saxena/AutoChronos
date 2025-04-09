import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { InternalServerError } from "../../error.controller.js";
import { OkResponseStrategy } from "../../response.controller.js";
import { catchAsync } from "../../../Utils/catchAsync.js";
export const lsDir = catchAsync(async (req, res, next) => {
    const absPath = req.body.path;
    if (!absPath || typeof absPath !== "string") {
        return res.status(400).json({ message: "Invalid or missing path." });
    }
    const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
    const safePath = absPath.replace(/["'`]/g, ""); // Remove quotes to prevent injection
    const script = `ls "${safePath}"`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ls: ${error.message}`);
            return next(new InternalServerError().handleResponse(res, {
                message: "Error executing ls",
                error: error.message,
            }));
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        new OkResponseStrategy().handleResponse(res, { info: stdout });
    });
});
export const history = catchAsync(async (_req, res, next) => {
    const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
    const script = `cat ~/.bash_history`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error reading command history: ${error.message}`);
            return next(new InternalServerError().handleResponse(res, {
                message: "Error reading command history",
                error: error.message,
            }));
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        new OkResponseStrategy().handleResponse(res, { info: stdout });
    });
});
export const fileRead = catchAsync(async (req, res, next) => {
    const absPath = req.body.path;
    const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
    console.log(path);
    const script = `less ${absPath}`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing echo: ${error.message}`);
            return next(new InternalServerError().handleResponse(res, {
                message: "Error executing echo",
                error: error.message,
            }));
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        new OkResponseStrategy().handleResponse(res, { info: stdout });
    });
});
