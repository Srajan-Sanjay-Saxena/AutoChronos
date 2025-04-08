import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import os from 'os';
import { catchAsync } from '../Utils/catchAsync.js';
import { env } from '../newProcess.js';
const runCommand = (command, name) => {
    return new Promise((resolve, reject) => {
        const homeDir = os.homedir();
        let filePath = path.join(homeDir, name);
        if (process.platform === 'win32') {
            filePath = filePath.replace(/\\/g, '/');
        }
        const scriptPath = path.join(homeDir, env.SHELL);
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
export const createfile = catchAsync(async (req, res, next) => {
    try {
        const filename = req.body.filename;
        await runCommand('touch', filename);
        res.send({ 'message': 'success' });
    }
    catch (error) {
        res.send({ 'message': 'failure' });
    }
});
export const deletefile = catchAsync(async (req, res, next) => {
    try {
        const filename = req.body.filename;
        await runCommand('rm', filename);
        res.send({ 'message': 'success' });
    }
    catch (error) {
        res.send({ 'message': 'failure' });
    }
});
export const createfolder = catchAsync(async (req, res, next) => {
    try {
        const foldername = req.body.foldername;
        await runCommand('mkdir', foldername);
        res.send({ 'message': 'success' });
    }
    catch (error) {
        res.send({ 'message': 'failure' });
    }
});
export const deletefolder = catchAsync(async (req, res, next) => {
    try {
        const foldername = req.body.foldername;
        await runCommand('rm -rf', foldername);
        res.send({ 'message': 'success' });
    }
    catch (error) {
        res.send({ 'message': 'failure' });
    }
});
