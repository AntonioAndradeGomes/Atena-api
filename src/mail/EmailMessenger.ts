import nodemailer from "nodemailer";
import { HandlebarsMailTemplate } from "./HandlebarsMailTemplate";

interface ITemplateVars {
  [key: string]: string | number
}

interface IParseMailTemplate {
  file: string,
  vars: ITemplateVars
}

interface IMailContact {
  name: string,
  mail: string
}

interface ISendMail {
  from?: IMailContact,
  to: IMailContact,
  subject: string,
  templateData: IParseMailTemplate
}

export default class EmailMessenger {
  async send({ to, from, subject, templateData }: ISendMail) {
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      auth: {
        user: "atenaproject.al@gmail.com",
        pass: "nvidiageforce@12"
      }
    });

    await transporter.sendMail({
      from: {
        name: from?.name || "Atena",
        address: from?.mail
      },
      to: {
        name: to.name,
        address: to.mail
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
  };
};
