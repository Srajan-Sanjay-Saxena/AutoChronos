import fs from "fs";
import { exec } from "child_process";
import path from "path";
import os from "os";
import { catchAsync } from "../../../Utils/catchAsync.js";
import { env } from "../../../newProcess.js";
import { CreateResponseStrategy, DeleteResponseStrategy, OkResponseStrategy, } from "../../response.controller.js";
import { BadRequest, InternalServerError } from "../../error.controller.js";
const runCommand = (command, filePath) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
        const script = `${command} "${filePath}"`;
        fs.writeFileSync(scriptPath, script, { mode: 0o755 });
        exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                // console.error(`Error executing script: ${error.message}`);
                return reject(new Error(error.message));
            }
            if (stderr) {
                // console.error(`stderr: ${stderr}`);
                return reject(new Error(stderr));
            }
            // console.log('Shell script executed successfully.');
            resolve();
        });
    });
};
export const createFile = catchAsync(async (req, res, next) => {
    const filename = req.body.filename;
    if (!filename)
        return next(new BadRequest().handleResponse(res, { info: "No filename given" }));
    try {
        await runCommand("touch", filename);
        new CreateResponseStrategy().handleResponse(res, {
            message: `Successfully created file ${filename}`,
        });
    }
    catch (error) {
        return next(new InternalServerError().handleResponse(res, {
            info: `Cannot create file ${filename}`,
        }));
    }
});
export const deleteFile = catchAsync(async (req, res, next) => {
    try {
        const filename = req.body.filename;
        if (!filename)
            return next(new BadRequest().handleResponse(res, { info: "No filename given" }));
        await runCommand("rm", filename);
        new DeleteResponseStrategy().handleResponse(res, {
            message: `Successfully deleted file ${filename}`,
        });
    }
    catch (error) {
        return next(new BadRequest().handleResponse(res, { info: "Cannot delete file" }));
    }
});
export const createFolder = catchAsync(async (req, res, next) => {
    const foldername = req.body.foldername;
    if (!foldername)
        return next(new BadRequest().handleResponse(res, { info: "No folder name given" }));
    try {
        await runCommand("mkdir", foldername);
        new CreateResponseStrategy().handleResponse(res, {
            info: `Folder creation completed successfully : ${foldername}`,
        });
    }
    catch (error) {
        return next(new InternalServerError().handleResponse(res, {
            info: "Unable to create folder with specified name",
        }));
    }
});
export const deleteFolder = catchAsync(async (req, res, next) => {
    const foldername = req.body.foldername;
    if (!foldername)
        return next(new BadRequest().handleResponse(res, { info: "No foldername given" }));
    try {
        await runCommand("rm -rf", foldername);
        new DeleteResponseStrategy().handleResponse(res, {
            message: `Successfully deleted file ${foldername}`,
        });
    }
    catch (error) {
        return next(new InternalServerError().handleResponse(res, { info: "Cannot delete folder" }));
    }
});
