import { env } from "../newProcess.js";
export const dbResolver = (DB) => {
    // return DB.replace('<password>' , env.PASSWORD).replace('<username>' , env.USERNAME);
    return DB;
};
