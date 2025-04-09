import express from "express";
import queueController from "../controllers/redis/Queues/queue.controller.js";
const router = express.Router();
router.post("/createFile", queueController.addWriteOpsQueue);
router.post("/deleteFile", queueController.addWriteOpsQueue);
router.post("/createFolder", queueController.addWriteOpsQueue);
router.post("/deleteFolder", queueController.addWriteOpsQueue);
export default router;
