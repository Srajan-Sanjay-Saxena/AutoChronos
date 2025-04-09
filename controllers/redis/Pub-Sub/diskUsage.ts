import diskUsage from "diskusage";
import os from "os";

export const getDiskUsage = async () => {
  try {
    // Get the root path (use '/' or the default path for your system)
    const path = os.platform() === "win32" ? "C:" : "/"; // Windows or Linux/Unix

    // Get disk usage details
    const { available, free, total } = await diskUsage.check(path);

    // Calculate disk usage percentage
    const used = total - available;
    const usedPercentage = ((used / total) * 100).toFixed(2);
    const freePercentage = ((free / total) * 100).toFixed(2);
    const totalSpace = `${(total / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    const usedSpace = `${(used / (1024 * 1024 * 1024)).toFixed(
      2
    )} GB (${usedPercentage}%)`;
    const freeSpace = `${(free / (1024 * 1024 * 1024)).toFixed(
      2
    )} GB (${freePercentage}%)`;

    console.log(`Disk Usage Report for ${path}:`);
    console.log(`Total Space: ${(total / (1024 * 1024 * 1024)).toFixed(2)} GB`);
    console.log(
      `Used Space: ${(used / (1024 * 1024 * 1024)).toFixed(
        2
      )} GB (${usedPercentage}%)`
    );
    console.log(
      `Free Space: ${(free / (1024 * 1024 * 1024)).toFixed(
        2
      )} GB (${freePercentage}%)`
    );
    return { totalSpace, freeSpace, usedSpace , path };
    // Log the disk usage
  } catch (error) {
    console.error("Error fetching disk usage:", error);
  }
};
