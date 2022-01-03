"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const HandlebarsMailTemplate_1 = require("./HandlebarsMailTemplate");
class EmailMessenger {
    async send({ to, from, subject, templateData }) {
        const mailTemplate = new HandlebarsMailTemplate_1.HandlebarsMailTemplate();
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        await transporter.sendMail({
            from: {
                name: (from === null || from === void 0 ? void 0 : from.name) || "Atena",
                address: (from === null || from === void 0 ? void 0 : from.mail) || "atenaproject.al@gmail.com"
            },
            to: {
                name: to.name,
                address: to.mail
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });
    }
    ;
}
exports.default = EmailMessenger;
;
