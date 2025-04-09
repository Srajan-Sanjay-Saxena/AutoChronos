import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { CreateResponseStrategy, DeleteResponseStrategy, OkResponseStrategy, } from "../../response.controller.js";
import { BadRequest, InternalServerError } from "../../error.controller.js";
import { getHostName } from "../../../Utils/hostName.js";
const runCommand = (command, filePath) => {
    return new Promise((resolve, reject) => {
        const hostName = getHostName();
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
const createFile = async (fileName) => await runCommand("touch", fileName);
const deleteFile = async (fileName) => await await runCommand("rm", fileName);
const createFolder = async (foldername) => await runCommand("mkdir", foldername);
const deleteFolder = async (foldername) => await runCommand("rm -rf", foldername);
export default { deleteFile, deleteFolder, createFile, createFolder };
