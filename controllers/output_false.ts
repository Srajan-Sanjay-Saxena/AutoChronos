import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define shell script path
const scriptPath = path.join(__dirname, 'createFile.sh');

// Step 1: Create the shell script with the content `touch hello.txt`
fs.writeFileSync(scriptPath, 'touch hello.txt', { mode: 0o755 });
console.log('Shell script created.');

// Step 2: Run the shell script
exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing script: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log('Shell script executed successfully.');
});
