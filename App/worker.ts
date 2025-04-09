import writeController from "../controllers/redis/Workers/write.controller.js";
import readController from "../controllers/redis/Workers/read.controller.js";
import { Worker } from "bullmq";

// Why the name readWorker in both cases and also why you aren't giving actual error as well?
const writeOpsWorker = async () => {
  const writeWorker = new Worker(  
    "write-ops",
    async (job) => {
      const jobName = job.name;
      const { pathName } = job.data;
      console.log('JOB DATA IS:' , job.data)
      if (!pathName)
        throw new Error("Cannot do write operations , path name not given");
      switch (jobName) {
        case "create-folder":
          try {
            await writeController.createFolder(pathName);
          } catch {
            throw new Error(
              "Sorry unable to create folder with path " + pathName
            );
          } finally {
            break;
          }

        case "create-file":
          try {
            await writeController.createFile(pathName);
          } catch {
            throw new Error(
              "Sorry unable to create file with path " + pathName
            );
          } finally {
            break;
          }
        case "delete-file":
          try {
            await writeController.deleteFile(pathName);
          } catch {
            throw new Error(
              "Sorry unable to delete file with path " + pathName
            );
          } finally {
            break;
          }
        case "delete-folder":
          try {
            await writeController.deleteFolder(pathName);
          } catch {
            throw new Error(
              "Sorry unable to delete folder with path " + pathName
            );
          } finally {
            break;
          }
      }
      return { success: true, message: "Long-running task finished" };
    },
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
      concurrency: 1,
    }
  );
  writeWorker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
  });

  writeWorker.on("failed", (job, error) => {
    console.error(`Job ${job.id} failed with error:`, error);
  });

  console.log(
    'Write operations worker started, listening to the "write-ops" queue.'
  );
};
const readOpsWorker = async () => {
  const readWorker = new Worker(
    "read-ops",
    async (job) => {
      const jobName = job.name;
      const { pathName } = job.data;
      console.log('JOB DATA IS:' , job.data)
      switch (jobName) {
        case "listing-directory":
          try {
            if (!pathName) return new Error("Bad Request : pathName not given");
            readController.listingDirectory(pathName);
          } catch {
            throw new Error(
              "Sorry unable to list folder with path " + pathName
            );
          } finally {
            break;
          }

        case "command-history":
          try {
            readController.gettingHistory();
          } catch {
            throw new Error("Sorry unable to fetch history ");
          } finally {
            break;
          }
        case "file-read":
          try {
            if (!pathName) return new Error("Bad Request : pathName not given");
            readController.readingFile(pathName);
          } catch {
            throw new Error(
              "Sorry unable to delete file with path " + pathName
            );
          } finally {
            break;
          }
      }
      return { success: true, message: "Long-running task finished" };
    },
    {
      connection: {
        host: "localhost",
        port: 6379,
      },
      concurrency: 1,
    }
  );
  readWorker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
  });

  readWorker.on("failed", (job, error) => {
    console.error(`Job ${job.id} failed with error:`, error);
  });

  console.log(
    'Write operations worker started, listening to the "write-ops" queue.'
  );
};

export default { readOpsWorker , writeOpsWorker }