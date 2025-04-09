import fs from "fs";
import { exec } from "child_process";
import path from "path";
import os from "os";
import { catchAsync } from "../Utils/catchAsync.js";
import type { Response, NextFunction } from "express";
import { env } from "../newProcess.js";
import type { ModifiedRequest } from "../Types/extras.types.js";
import {
  CreateResponseStrategy,
  DeleteResponseStrategy,
  OkResponseStrategy,
} from "./response.controller.js";
import { BadRequest, InternalServerError } from "./error.controller.js";
import cron from "node-cron"; // new import for scheduling

/**
 * Runs a command to modify the file system.
 * @param {("touch" | "mkdir" | "rm" | "rm -rf")} command - The command to be executed.
 * @param {string} filePath - The target file or folder path.
 * @returns {Promise<void>}
 */
const runCommand = (
  command, // "touch" | "mkdir" | "rm" | "rm -rf"
  filePath
) => {
  return new Promise<void>((resolve, reject) => {
    const isWindows = process.platform === "win32";
    const adjustedPath = isWindows ? filePath.replace(/\//g, "\\") : filePath;
    let fullCommand = "";

    if (isWindows) {
      switch (command) {
        case "touch":
          fullCommand = `type nul > "${adjustedPath}"`;
          break;
        case "mkdir":
          fullCommand = `mkdir "${adjustedPath}"`;
          break;
        case "rm":
          fullCommand = `del "${adjustedPath}"`;
          break;
        case "rm -rf":
          fullCommand = `rmdir /s /q "${adjustedPath}"`;
          break;
        default:
          return reject(new Error(`Unsupported command: ${command}`));
      }
    } else {
      fullCommand = `${command} "${adjustedPath}"`;
    }

    exec(fullCommand, (error, stdout, stderr) => {
      if (error) return reject(new Error(error.message));
      if (stderr) return reject(new Error(stderr));
      resolve();
    });
  });
};

export const createFile = catchAsync(
  async (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const filename = req.body.filename;
    const period = req.body.period;
    if (!filename) {
      return next(
        new BadRequest().handleResponse(res, { info: "No filename given" })
      );
    }

    // If period is specified, schedule the command to run repeatedly.
    if (period) {
      try {
        cron.schedule(period, async () => {
          try {
            await runCommand("touch", filename);
            console.log(
              `Scheduled job: Created file ${filename} at ${new Date().toLocaleString()}`
            );
          } catch (err) {
            console.error(`Scheduled job error (createFile): ${err}`);
          }
        });
        return new CreateResponseStrategy().handleResponse(res, {
          message: `Scheduled file creation of ${filename} every "${period}"`,
        });
      } catch (err) {
        return next(
          new InternalServerError().handleResponse(res, {
            info: `Failed to schedule file creation for ${filename}`,
          })
        );
      }
    }

    // Otherwise, run the command immediately.
    try {
      await runCommand("touch", filename);
      new CreateResponseStrategy().handleResponse(res, {
        message: `Successfully created file ${filename}`,
      });
    } catch (error) {
      return next(
        new InternalServerError().handleResponse(res, {
          info: `Cannot create file ${filename}`,
        })
      );
    }
  }
);

export const deleteFile = catchAsync(
  async (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const filename = req.body.filename;
    const period = req.body.period;
    if (!filename) {
      return next(
        new BadRequest().handleResponse(res, { info: "No filename given" })
      );
    }

    if (period) {
      try {
        cron.schedule(period, async () => {
          try {
            await runCommand("rm", filename);
            console.log(
              `Scheduled job: Deleted file ${filename} at ${new Date().toLocaleString()}`
            );
          } catch (err) {
            console.error(`Scheduled job error (deleteFile): ${err}`);
          }
        });
        return new DeleteResponseStrategy().handleResponse(res, {
          message: `Scheduled file deletion of ${filename} every "${period}"`,
        });
      } catch (err) {
        return next(
          new InternalServerError().handleResponse(res, {
            info: `Failed to schedule file deletion for ${filename}`,
          })
        );
      }
    }

    try {
      await runCommand("rm", filename);
      new DeleteResponseStrategy().handleResponse(res, {
        message: `Successfully deleted file ${filename}`,
      });
    } catch (error) {
      return next(
        new BadRequest().handleResponse(res, { info: "Cannot delete file" })
      );
    }
  }
);

export const createFolder = catchAsync(
  async (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const foldername = req.body.foldername;
    const period = req.body.period;
    if (!foldername) {
      return next(
        new BadRequest().handleResponse(res, { info: "No folder name given" })
      );
    }

    if (period) {
      try {
        cron.schedule(period, async () => {
          try {
            await runCommand("mkdir", foldername);
            console.log(
              `Scheduled job: Created folder ${foldername} at ${new Date().toLocaleString()}`
            );
          } catch (err) {
            console.error(`Scheduled job error (createFolder): ${err}`);
          }
        });
        return new CreateResponseStrategy().handleResponse(res, {
          message: `Scheduled folder creation of ${foldername} every "${period}"`,
        });
      } catch (err) {
        return next(
          new InternalServerError().handleResponse(res, {
            info: "Failed to schedule folder creation",
          })
        );
      }
    }

    try {
      await runCommand("mkdir", foldername);
      new CreateResponseStrategy().handleResponse(res, {
        info: `Folder creation completed successfully : ${foldername}`,
      });
    } catch (error) {
      return next(
        new InternalServerError().handleResponse(res, {
          info: "Unable to create folder with specified name",
        })
      );
    }
  }
);

export const deleteFolder = catchAsync(
  async (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const foldername = req.body.foldername;
    const period = req.body.period;
    if (!foldername) {
      return next(
        new BadRequest().handleResponse(res, { info: "No foldername given" })
      );
    }

    if (period) {
      try {
        cron.schedule(period, async () => {
          try {
            await runCommand("rm -rf", foldername);
            console.log(
              `Scheduled job: Deleted folder ${foldername} at ${new Date().toLocaleString()}`
            );
          } catch (err) {
            console.error(`Scheduled job error (deleteFolder): ${err}`);
          }
        });
        return new DeleteResponseStrategy().handleResponse(res, {
          message: `Scheduled folder deletion of ${foldername} every "${period}"`,
        });
      } catch (err) {
        return next(
          new InternalServerError().handleResponse(res, {
            info: "Failed to schedule folder deletion",
          })
        );
      }
    }

    try {
      await runCommand("rm -rf", foldername);
      new DeleteResponseStrategy().handleResponse(res, {
        message: `Successfully deleted folder ${foldername}`,
      });
    } catch (error) {
      return next(
        new InternalServerError().handleResponse(res, { info: "Cannot delete folder" })
      );
    }
  }
);
