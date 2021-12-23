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

export default class EhterealMail {
  async send({ to, from, subject, templateData }: ISendMail) {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Atena",
        address: from?.mail || "suporte@atena.com.br"
      },
      to: {
        name: to.name,
        address: to.mail
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });

    console.log(message)

    console.log("Message sent: %s", message.messageId);
    console.log("Preview url: %s", nodemailer.getTestMessageUrl(message));
  };
};
