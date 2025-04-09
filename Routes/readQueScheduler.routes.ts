import express from "express";
import queueController from "../controllers/redis/Queues/queue.controller.js";

export const readQueScheduler = express.Router();
readQueScheduler.get("/", queueController.addReadOpsQueue);


