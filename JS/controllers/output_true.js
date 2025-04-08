import { exec } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { env } from '../newProcess.js';
import { catchAsync } from '../Utils/catchAsync.js';
export const lsDir = catchAsync(async (req, res, next) => {
    const absPath = req.body.path;
    if (!absPath || typeof absPath !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing path.' });
    }
    const homeDir = os.homedir();
    // Define full path to the shell script in the home directory
    const scriptPath = path.join(homeDir, env.SHELL);
    // Sanitize input minimally — avoid running `ls` on potentially dangerous input
    // You can add more checks if needed
    const safePath = absPath.replace(/["'`]/g, ''); // Basic sanitation
    const script = `ls -lah "${safePath}"`;
    fs.writeFileSync(scriptPath, script, { mode: 0o755 });
    exec(`sh "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing ls: ${error.message}`);
            return res.status(500).json({ message: 'Error executing ls', error: error.message });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        res.status(200).send(stdout); // Sending raw output as plain text
    });
});
