import { redisSub } from "../../../App/worker.pub-sub.js";
import { DiskSpaceNotification } from "../../../Utils/Email.js";
async function startWorker() {
    redisSub.on("error", (err) => console.error("Redis Error:", err));
    await redisSub.subscribe("sendEmail-task", (message) => {
        console.log("[Worker] Received broadcast task:", message);
        // Optional: parse and run some action
        try {
            const { emailTo, finalSubject, cronTime } = JSON.parse(message);
            // Perform actions based on `data.type`
            new DiskSpaceNotification(emailTo);
        }
        catch (e) {
            console.error("[Worker] Invalid message format", e);
        }
    });
}
startWorker();
