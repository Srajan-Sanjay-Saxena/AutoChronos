import { app } from "../App/app.js";
import { env } from "../newProcess.js";
import { Queue } from 'bullmq';
import { createClient } from "redis";
process.on('uncaughtException', (err) => {
    console.log('Uncaught exception', err.name);
    console.log('shutting down server');
    process.exit(1);
});
const redisClient = createClient({
    url: 'redis://localhost:6379'
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();
const server = app.listen(env.PORT, () => {
    console.log('Server listening on the port', env.PORT);
});
process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection : ', err.name);
    console.log('Stack is : ', err.stack);
    server.close(() => {
        console.log('Shutting down server');
        process.exit(1);
    });
});
