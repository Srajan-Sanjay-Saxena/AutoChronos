import { catchAsync } from "../Utils/catchAsync.js";
export const getlog = catchAsync(async (req, res, next) => {
    const timestamp = new Date().getTime();
    const machineId = 'thisisamachineid';
    const command = 'touch C:/Users/Desktop/file.txt';
    console.log(timestamp);
    const item = {
        time: timestamp,
        machine: machineId,
        command: command
    };
    let result = {};
    for (let i = 0; i < 10; i++) {
        result[i] = item;
    }
    res.send(result);
});
