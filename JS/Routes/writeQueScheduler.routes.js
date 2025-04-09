import express from "express";
import queueController from "../controllers/redis/Queues/queue.controller.js";
export const writeQueScheduler = express.Router();
writeQueScheduler.post("/", queueController.addWriteOpsQueue);
