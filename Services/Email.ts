import type { NextFunction } from "express";
import type { EmailBrand } from "../Types/extras.types.js";
import { create } from "express-handlebars";
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";
import { env } from "../newProcess.js";
import type { UserNamespace } from "../Types/user.types.js";

interface EmailService {
  sendEmail: (template: string, subject: string, next: NextFunction) => void;
}

abstract class Email implements EmailService {
  public to: EmailBrand;
  public from: EmailBrand;

  protected static handleBarsOption = {
    viewEngine: create({
      extname: ".handlebars",
      defaultLayout: false,
      partialsDir: path.resolve("./views/partials"),
    }),
    extName: ".handlebars",
    viewPath: path.resolve("./views"),
  };

  protected constructor(user: UserNamespace.UserDoc) {
    this.to = user.email as EmailBrand;
    this.from = env.EMAIL_FROM as EmailBrand;
  }

  protected static transporter() {
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

  abstract sendEmail(
    subject: string,
    template: string,
    next: NextFunction
  ): void;
}

export class TwoFAEmailVerification extends Email {
  public token: number;
  constructor(user: UserNamespace.UserDoc, token: number) {
    super(user);
    this.token = token;
  }
  override sendEmail(
    subject: string,
    template: string,
    next: NextFunction
  ): void {
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
