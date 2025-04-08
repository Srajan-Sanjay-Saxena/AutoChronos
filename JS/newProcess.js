import dotenv from "dotenv";
import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";
dotenv.config(); // ✅ Make sure this runs before accessing process.env
export const env = createEnv({
    server: {
        PORT: z.string(),
        SHELL: z.string()
    },
    clientPrefix: "",
    client: {},
    runtimeEnv: process.env,
});
