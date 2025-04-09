import fs from "fs";
import { exec } from "child_process";
import path from "path";
import os, { hostname } from "os";
import { catchAsync } from "../../../Utils/catchAsync.js";
import type { Response, NextFunction } from "express";
import { env } from "../../../newProcess.js";
import type {
  ModifiedRequest,
  ShellCommands,
} from "../../../Types/extras.types.js";
import {
  CreateResponseStrategy,
  DeleteResponseStrategy,
  OkResponseStrategy,
} from "../../response.controller.js";
import { BadRequest, InternalServerError } from "../../error.controller.js";
import { getHostName } from "../../../Utils/hostName.js";
import { Command } from "../../../Models/logs.model.js";
import { fileURLToPath } from "url";

const runCommand =(
  command: ShellCommands,
  filePath: string
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const hostName = await getHostName();
    // const hostName = 'somehost';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const scriptPath = path.join(__dirname, "script.sh");

    const script = `${command} "${filePath}"`;
    console.log("Script1 is: ",script);
    try {
      fs.writeFileSync(scriptPath, script, { mode: 0o755 });
      console.log("Script2 is: ", script);
    } catch (err) {
      console.error("Error writing script file:", err);
    }
    
    console.log("Script2 is: ",script);

    console.log('Adding to the database.');
    const shellCommand =
      process.platform === "win32"
        ? `cmd /c ${scriptPath}`
        : `sh ${scriptPath}`;

    exec(shellCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        return reject(new Error(error.message));
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log('Shell script executed successfully.');
      try {
        await Command.create({
          machineId: hostName,
          command: script,
        });
        console.log("Data saved");
        resolve();
      } catch (err) {
        console.error("Error saving to database:", err);
        reject(err);
      }
    });
  });
};

const createFile = async (fileName: string) =>
  await runCommand("touch", fileName);
const deleteFile = async (fileName: string) =>
  await await runCommand("rm", fileName);
const createFolder = async (foldername: string) =>
  await runCommand("mkdir", foldername);
const deleteFolder = async (foldername: string) =>
  await runCommand("rm -rf", foldername);

export default { deleteFile, deleteFolder, createFile, createFolder };
