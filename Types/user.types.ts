import type { HydratedDocument, InferSchemaType } from "mongoose"
import type { userSchema } from "../Models/user.model.js"

export type ErrorNextFunction = (err ?: Error) => void



export namespace UserNamespace {
    export type UserMethods = {
        comparePassword : (candidatePassword : string, storedPassword :string) => boolean
    }

    export type UserSchemaType = InferSchemaType<typeof userSchema>;
    export type UserDoc = HydratedDocument<UserSchemaType , UserMethods , {}>
}