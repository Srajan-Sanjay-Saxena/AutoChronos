import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { getHostName } from "../../../Utils/hostName.js";
const listingDirectory = (absPath) => {
    const hostname = getHostName();
    const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
    const safePath = absPath.replace(/["'`]/g, ""); // Remove quotes to prevent injection
    const script = `ls "${safePath}"`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    const result = exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ls: ${error.message}`);
            throw new Error("Sorry cannot perform operation");
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    }).stdout;
};
const gettingHistory = () => {
    const hostname = getHostName();
    const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
    const script = `cat ~/.bash_history`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    const result = exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error reading command history: ${error.message}`);
            throw new Error("Sorry cannot perform operation");
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    }).stdout;
};
const readingFile = (absPath) => {
    const hostname = getHostName();
    const scriptPath = path.join(path.dirname(new URL(import.meta.url).pathname), "script.sh");
    console.log(path);
    const script = `less ${absPath}`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    const result = exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing echo: ${error.message}`);
            throw new Error("Sorry cannot perform operation");
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    }).stdout;
};
export default { readingFile, gettingHistory, listingDirectory };
