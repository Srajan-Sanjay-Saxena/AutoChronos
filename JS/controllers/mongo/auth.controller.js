import { env } from "../../newProcess.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
const jwtSign = (id) => {
    //TODO : rectify the error of env.JWT_EXPIRES_AT
    const token = jwt.sign({ id }, env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
    return token;
};
/**
 * Sends a JWT token in a secure cookie.
 *
 * @param {UserNamespace.UserDoc} user - The user object containing the user ID.
 * @param {Response} res - The Express Response object used to send the cookie.
 */
export const sendTokenInCookie = (user, res) => {
    const token = jwtSign(user.id);
    let cookieOptions = {
        expires: new Date(Date.now() + parseInt(env.COOKIE_EXPIRES) * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
    };
    res.cookie("jwt", token, cookieOptions);
};
