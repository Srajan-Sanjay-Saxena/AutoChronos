import dotenv from "dotenv";
import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";
dotenv.config();
export const env = createEnv({
    server: {
        PORT: z.string(),
        NODE_ENV: z.enum(['development', 'production']),
        SHELL: z.string()
    },
    clientPrefix: "",
    client: {},
    runtimeEnv: process.env,
});
