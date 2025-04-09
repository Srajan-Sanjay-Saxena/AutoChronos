import { exec } from "child_process";

export const getHostName = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec("hostname", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing hostname: ${error?.message}`);
                reject(new Error("Sorry cannot perform operation"));
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject(new Error("Sorry cannot perform operation"));
            }

            resolve(stdout.trim());
        });
    });
}