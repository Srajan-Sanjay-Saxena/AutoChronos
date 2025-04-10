import express from "express";
import cookieParser from "cookie-parser";
import { type Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { globalErrorHandlingMiddleware } from "../controllers/error.controller.js";
import { env } from "../newProcess.js";
import { readQueScheduler } from "../Routes/readQueScheduler.routes.js";
import { writeQueScheduler } from "../Routes/writeQueScheduler.routes.js";
import { logRouter } from "../Routes/getlog.routes.js";
import { emailPubSubRouter } from "../Routes/email.pub-sub.routes.js";
import cors from 'cors'
import { corsOptions } from "../Utils/corsOption.js";

const app: Application = express();
app.use(helmet());
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions))
app.use(cors())
app.use("/api/v1/swarm/write-ops/", writeQueScheduler);
app.use("/api/v1/swarm/read-ops/", readQueScheduler);
app.use("/api/v1/swarm/getLog/", logRouter);
app.use("/app/v1/swarm/getDiskStorageEmail/", emailPubSubRouter);

app.get("/", (req, res) => {
  res.send("Site working");
});

app.use(globalErrorHandlingMiddleware);

export { app };
