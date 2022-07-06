"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessenger = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const HandlebarsMailTemplate_1 = require("./HandlebarsMailTemplate");
class EmailMessenger {
    static async send({ to, from, subject, templateData }) {
        const mailTemplate = new HandlebarsMailTemplate_1.HandlebarsMailTemplate();
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
        const account = await nodemailer_1.default.createTestAccount();
        const transporter = nodemailer_1.default.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            }
        });
        const message = await transporter.sendMail({
            from: {
                name: (from === null || from === void 0 ? void 0 : from.name) || 'Atena',
                address: (from === null || from === void 0 ? void 0 : from.mail) || "atenaproject.al@gmail.com",
            },
            to: {
                name: to.name,
                address: to.mail,
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });
        console.log('Message send: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(message));
    }
}
exports.EmailMessenger = EmailMessenger;
