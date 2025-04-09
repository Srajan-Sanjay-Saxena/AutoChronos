import { createClient, type RedisClientType } from "redis";
import worker from "../App/worker.bull.js";

console.log('Redis listening')
worker.readOpsWorker();
worker.writeOpsWorker();
