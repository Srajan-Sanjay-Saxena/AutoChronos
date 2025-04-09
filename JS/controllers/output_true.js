import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { catchAsync } from "../Utils/catchAsync.js";
import { OkResponseStrategy } from "./response.controller.js";
import { InternalServerError } from "./error.controller.js";
export const lsDir = catchAsync(async (req, res, next) => {
    const absPath = req.body.path;
    if (!absPath || typeof absPath !== "string") {
        return res.status(400).json({ message: "Invalid or missing path." });
    }
    const safePath = absPath.replace(/["'`]/g, ""); // Sanitize input
    const isWindows = process.platform === "win32";
    const command = isWindows
        ? `dir "${safePath}"` // Windows equivalent of `ls`
        : `ls "${safePath}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return next(new InternalServerError().handleResponse(res, {
                message: "Error listing directory",
                error: error.message,
            }));
        }
        if (stderr)
            console.error(`stderr: ${stderr}`);
        new OkResponseStrategy().handleResponse(res, { info: stdout });
    });
});
export const history = catchAsync(async (_req, res, next) => {
    const isWindows = process.platform === "win32";
    const command = isWindows
        ? `doskey /history` // Basic Windows equivalent
        : `cat ~/.bash_history`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return next(new InternalServerError().handleResponse(res, {
                message: "Error reading command history",
                error: error.message,
            }));
        }
        if (stderr)
            console.error(`stderr: ${stderr}`);
        new OkResponseStrategy().handleResponse(res, { info: stdout });
    });
});
export const fileRead = catchAsync(async (req, res, next) => {
    const absPath = req.body.path;
    if (!absPath || typeof absPath !== "string") {
        return res.status(400).json({ message: "Invalid or missing file path." });
    }
    const safePath = absPath.replace(/["'`]/g, "");
    const isWindows = process.platform === "win32";
    const command = isWindows
        ? `type "${safePath}"` // Windows equivalent of `less` or `cat`
        : `cat "${safePath}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return next(new InternalServerError().handleResponse(res, {
                message: "Error reading file",
                error: error.message,
            }));
        }
        if (stderr)
            console.error(`stderr: ${stderr}`);
        new OkResponseStrategy().handleResponse(res, { info: stdout });
    });
});
