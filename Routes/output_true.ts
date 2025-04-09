import express from "express";
import queueController from "../controllers/redis/Queues/queue.controller.js";

const router = express.Router();

router.get("/lsDir", queueController.addReadOpsQueue);
router.get("/history", queueController.addReadOpsQueue);
router.get("/fileRead", queueController.addReadOpsQueue);

export default router;
