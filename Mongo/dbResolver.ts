import { env } from "../newProcess.js"

export const dbResolver = (DB : string): string => {
    return DB.replace('<password>' , env.PASSWORD).replace('<username>' , env.USER_NAME);
}