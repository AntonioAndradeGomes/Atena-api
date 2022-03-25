"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordEmailService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
const GenereteUserToken_1 = require("../../../../provider/GenereteUserToken");
const path_1 = __importDefault(require("path"));
const EmailMessenger_1 = require("../../../../config/mail/EmailMessenger");
class SendForgotPasswordEmailService {
    async execute({ mail }) {
        const user = await prisma_1.default.user.findUnique({ where: { mail } });
        if (!user) {
            throw new AppError_1.AppError('User does not exists.');
        }
        const provider = new GenereteUserToken_1.GenereteUserToken();
        const token = await provider.execute({ userId: user.id });
        const forgotPasswordTemplate = path_1.default.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        await EmailMessenger_1.EmailMessenger.send({
            to: {
                mail: user.mail,
                name: user.name
            },
            subject: '[Atena] - Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                vars: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token.token}`,
                }
            }
        });
    }
}
exports.SendForgotPasswordEmailService = SendForgotPasswordEmailService;
