import worker from "../App/worker.bull.js";
import { startEmailSubscriber } from "../controllers/redis/Pub-Sub/sub.controller.js";

console.log('Redis listening....')
worker.readOpsWorker();
worker.writeOpsWorker();
startEmailSubscriber();