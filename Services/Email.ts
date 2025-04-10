import type { NextFunction } from "express";
import type { EmailBrand } from "../Types/extras.types.js";
import { create } from "express-handlebars";
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";
import { env } from "../newProcess.js";
import type { UserNamespace } from "../Types/model.types.js";

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

  protected constructor(emailTo: string) {
    this.to = emailTo as EmailBrand;
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

export class DiskSpaceNotification extends Email {
  public containerId: string;
  public totalSpace: string;
  public usedSpace: string;
  public freeSpace: string;
  public pathName: string;
  constructor(
    emailTo: string,
    containerId: string,
    totalSpace: string,
    usedSpace: string,
    freeSpace: string,
    pathName: string
  ) {
    super(emailTo);
    this.containerId = containerId;
    this.freeSpace = freeSpace;
    this.pathName = pathName;
    this.usedSpace = usedSpace;
    this.totalSpace = totalSpace;
  }
  override sendEmail(subject: string, template: string): void {
    const transporter = Email.transporter();
    transporter.use("compile", hbs(Email.handleBarsOption));
    const mailOptions = {
      to: this.to,
      from: this.from,
      subject: subject,
      template: template,
      context: {
        containerId: this.containerId,
        freeSpace: this.freeSpace,
        pathName: this.pathName,
        usedSpace: this.usedSpace,
        totalSpace: this.totalSpace,
      },
    };
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        throw new Error("Internal server , verification email can't be send");
      }
    });
  }
}
