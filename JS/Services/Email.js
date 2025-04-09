import { create } from "express-handlebars";
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";
import { env } from "../newProcess.js";
class Email {
    to;
    from;
    static handleBarsOption = {
        viewEngine: create({
            extname: ".handlebars",
            defaultLayout: false,
            partialsDir: path.resolve("./views/partials"),
        }),
        extName: ".handlebars",
        viewPath: path.resolve("./views"),
    };
    constructor(user) {
        this.to = user.email;
        this.from = env.EMAIL_FROM;
    }
    static transporter() {
        return nodemailer.createTransport({
            host: env.HOST,
            port: parseInt(env.EMAIL_PORT),
            auth: {
                user: env.EMAIL_USERNAME,
                pass: env.SMTP_KEY,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
}
export class TwoFAEmailVerification extends Email {
    token;
    constructor(user, token) {
        super(user);
        this.token = token;
    }
    sendEmail(subject, template, next) {
        const transporter = Email.transporter();
        transporter.use("compile", hbs(Email.handleBarsOption));
        const mailOptions = {
            to: this.to,
            from: this.from,
            subject: subject,
            template: template,
        };
        transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                next(new Error("Internal server , verification email can't be send"));
                console.log("Error occurred:", err);
            }
        });
    }
}
