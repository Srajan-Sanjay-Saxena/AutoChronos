import express from "express";
import { getLog } from "../controllers/redis/GUI/getlog.controller.js";

const logRouter = express.Router();

logRouter.get("/", getLog);

export default logRouter;
