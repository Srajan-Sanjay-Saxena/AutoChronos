import { createClient } from "redis";
export const redisSub = createClient({
    url: "redis://localhost:6379",
});
export const redisPub = createClient({
    url: "redis://localhost:6379",
});
redisSub.on("error", (err) => console.log("Redis Client Error with subscriber", err));
await redisSub
    .connect()
    .then(() => console.log("Subscriber connected to redis , listening on port 6379......"));
redisPub.on("error", (err) => console.log("Redis Client Error with publisher", err));
await redisPub
    .connect()
    .then(() => console.log("Publisher connected to redis , listening on port 6379......"));
