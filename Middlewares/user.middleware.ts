import bcrypt from "bcryptjs";
import type { ErrorNextFunction, UserNamespace } from "../Types/user.types.js";

export async function encryptPassword(
    this: UserNamespace.UserDoc,
    next: ErrorNextFunction
  ) {
    try {
      if (!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err as Error);
    }
    next();
  }