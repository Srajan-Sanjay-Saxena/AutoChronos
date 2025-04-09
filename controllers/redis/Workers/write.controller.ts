import fs from "fs";
import { exec } from "child_process";
import path from "path";
import os from "os";
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

const runCommand = (
  command: ShellCommands,
  filePath: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      "script.sh"
    );
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

const createFile = async (fileName: string) =>
  await runCommand("touch", fileName);
const deleteFile = async (fileName: string) =>
  await await runCommand("rm", fileName);
const createFolder = async (foldername: string) =>
  await runCommand("mkdir", foldername);
const deleteFolder = async (foldername: string) =>
  await runCommand("rm -rf", foldername);

export default { deleteFile, deleteFolder, createFile, createFolder };
