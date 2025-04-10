import express from "express";
import { getLog } from "../controllers/redis/GUI/getlog.controller.js";

export const logRouter = express.Router();
logRouter.get("/", getLog);

