import express from "express";
import { getLog } from "../controllers/redis/GUI/getLog.controller.js";

export const logRouter = express.Router();
logRouter.get("/", getLog);

