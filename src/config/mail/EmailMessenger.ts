import nodemailer from "nodemailer";
import { HandlebarsMailTemplate } from "./HandlebarsMailTemplate";

interface ITemplateVars {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  vars: ITemplateVars;
}

interface IMailContact {
  name: string;
  mail: string;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class EmailMessenger {
  static async send({ to, from, subject, templateData }: ISendMail) {
    const mailTemplate = new HandlebarsMailTemplate();

    //todo: descobrir como fazer o email do google mandar um email para o user

    /*const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });*/

    /*await transporter.sendMail({
      from: {
        name: from?.name || "Atena",
        address: from?.mail || "atenaproject.al@gmail.com",
      },
      to: {
        name: to.name,
        address: to.mail,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });*/

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth:{
        user: account.user,
        pass: account.pass,
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Atena',
        address: from?.mail || "atenaproject.al@gmail.com",
      },
      to: {
        name: to.name,
        address: to.mail,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message send: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EmailMessenger };
