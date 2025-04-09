import dotenv from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
dotenv.config();
export const env = createEnv({
    server: {
        PORT: z.string(),
        NODE_ENV: z.enum(["development", "production"]),
        //* DB COnnections details------------------------------------------
        DB: z
            .string()
            .refine((value) => value.includes("<username>") && value.includes("<password>"), {
            message: "DB string must contain <username> and <password>",
        }),
        USERNAME: z.string().refine((value) => value.length >= 3, {
            message: "Username must be at least 3 characters long"
        }),
        PASSWORD: z.string(),
        //* JWT Details---------------------------------------------
        JWT_SECRET_KEY: z.string(),
        JWT_EXPIRES_AT: z.string().refine(value => value.endsWith("d")),
        COOKIE_EXPIRES: z.string(),
        //* Email service details---------------------------------------------
        HOST: z.string(),
        EMAIL_FROM: z.string().email(),
        EMAIL_USERNAME: z.string(),
        SMTP_KEY: z.string(),
        EMAIL_PORT: z.string().refine(value => value.length === 3),
    },
    clientPrefix: 'CLIENT',
    client: {
        CLIENT_ORIGIN: z.string()
    },
    runtimeEnv: process.env,
});
