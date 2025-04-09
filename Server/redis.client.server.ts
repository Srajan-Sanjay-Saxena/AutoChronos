import { createClient, type RedisClientType } from "redis";
import worker from "../App/worker.js";

export const redisClient: RedisClientType = createClient({
  url: "redis://localhost:6379",
});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
await redisClient.connect().then(() => console.log('Connected to redis , listening on port 6379......'));
console.log('Redis listening')
worker.readOpsWorker();
worker.writeOpsWorker();
