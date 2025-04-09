import express from "express";
import { emailRequestBroadcaster } from "../controllers/redis/Pub-Sub/pub.controller.js";

export const emailPubSubRouter = express.Router();
emailPubSubRouter.post("/", emailRequestBroadcaster);
