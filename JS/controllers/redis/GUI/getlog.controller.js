import { catchAsync } from "../../../Utils/catchAsync.js";
import { Command } from "../../../Models/logs.model.js";
export const getlog = catchAsync(async (req, res, next) => {
    try {
        const lastTenTasks = await Command.find()
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).send(lastTenTasks);
    }
    catch (error) {
        console.log('Error in getting log data: ', error);
        res.json({
            success: false
        });
    }
});
