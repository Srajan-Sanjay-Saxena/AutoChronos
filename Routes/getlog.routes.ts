import express from "express";

export const logRouter = express.Router();
logRouter.get("/", getLog);
