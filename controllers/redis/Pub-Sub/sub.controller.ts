import { redisSub } from "../../../App/worker.pub-sub.js";
import { getDiskUsage } from "../../../Services/DiskUsage.js";
import { DiskSpaceNotification } from "../../../Services/Email.js";
import { getHostName } from "../../../Utils/hostName.js";
import cron from "node-cron";
async function startWorker() {
  redisSub.on("error", (err) => console.error("Redis Error:", err));
  await redisSub.subscribe("sendEmail-task", async (message) => {
    console.log("[Worker] Received broadcast task:", message);

    // Optional: parse and run some action
    try {
      const { emailTo, finalSubject, cronTime } = JSON.parse(message);
      const containerId = getHostName().toString();
      const { totalSpace, freeSpace, usedSpace, path } = await getDiskUsage();
      // Perform actions based on `data.type`
      cron.schedule(cronTime, async () => {
        console.log(
          `[Worker] Running scheduled task for ${emailTo} at ${new Date().toISOString()}`
        );

        const { totalSpace, freeSpace, usedSpace, path } = await getDiskUsage();

        new DiskSpaceNotification(
          emailTo,
          containerId,
          totalSpace,
          usedSpace,
          freeSpace,
          path
        ).sendEmail(finalSubject, "container-usage");
      });

      console.log(
        `[Worker] Cron job scheduled for ${emailTo} with time: ${cronTime}`
      );
    } catch (e) {
      console.error("[Worker] Invalid message format", e);
    }
  });
}

startWorker();
