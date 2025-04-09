import express from "express";
import queueController from "../controllers/redis/Queues/queue.controller.js";
export const writeQueScheduler = express.Router();
writeQueScheduler.post("/createFile", queueController.addWriteOpsQueue);
writeQueScheduler.post("/deleteFile", queueController.addWriteOpsQueue);
writeQueScheduler.post("/createFolder", queueController.addWriteOpsQueue);
writeQueScheduler.post("/deleteFolder", queueController.addWriteOpsQueue);
