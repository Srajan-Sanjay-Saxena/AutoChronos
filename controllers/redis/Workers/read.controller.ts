import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { getHostName } from "../../../Utils/hostName.js";
import { Command } from "../../../Models/logs.model.js";


const listingDirectory = async (absPath: string) => {
  const hostname = await getHostName();
  const scriptPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "script.sh"
  );
  console.log(hostname)
  const safePath = absPath.replace(/["'`]/g, ""); // Remove quotes to prevent injection
  const script = `ls "${safePath}"`;
  fs.writeFileSync(scriptPath, script, { mode: 0o755 });
  
  const result = exec(`sh "${scriptPath}"`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing ls: ${error.message}`);
      throw new Error("Sorry cannot perform operation");
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    try {
      await Command.create({
        machineId: hostname,
        command: script,
        result: stdout
      });
      console.log("Data saved");
    } catch (err) {
      console.error("Error saving to database:", err);
    }
  }).stdout;
};

const gettingHistory = async() => {
  const hostname = await getHostName();
  const scriptPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "script.sh"
  );
  const script = `cat ~/.bash_history`;
  fs.writeFileSync(scriptPath, script, { mode: 0o755 });

  const result=exec(`sh "${scriptPath}"`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error reading command history: ${error.message}`);
      throw new Error("Sorry cannot perform operation");
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    try {
      await Command.create({
        machineId: hostname,
        command: script,
        result: stdout
      });
      console.log("Data saved");
    } catch (err) {
      console.error("Error saving to database:", err);
    }
  }).stdout;
};

const readingFile = async(absPath: string) => {
  const hostname = await getHostName();
  const scriptPath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "script.sh"
  );
  const script = `less ${absPath}`;
  fs.writeFileSync(scriptPath, script, { mode: 0o755 });

  const result=exec(`sh "${scriptPath}"`, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing echo: ${error.message}`);
      throw new Error("Sorry cannot perform operation");
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    
    try {
      await Command.create({
        machineId: hostname,
        command: script,
        result: stdout
      });
      console.log("Data saved");
    } catch (err) {
      console.error("Error saving to database:", err);
    }
  }).stdout;
};

export default { readingFile, gettingHistory, listingDirectory };
