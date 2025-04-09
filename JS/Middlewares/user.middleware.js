import bcrypt from "bcryptjs";
export async function encryptPassword(next) {
    try {
        if (!this.isModified("password"))
            return next();
        this.password = await bcrypt.hash(this.password, 10);
    }
    catch (err) {
        return next(err);
    }
    next();
}
