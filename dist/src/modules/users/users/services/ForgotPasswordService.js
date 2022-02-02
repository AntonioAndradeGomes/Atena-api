"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
const GenerateTokenController_1 = require("../../userToken/controllers/GenerateTokenController");
const EmailMessenger_1 = __importDefault(require("../../../../mail/EmailMessenger"));
const path_1 = __importDefault(require("path"));
;
class ForgotPasswordService {
    async execute({ mail }) {
        const user = await prisma_1.default.user.findFirst({
            where: { mail }
        });
        if (!user) {
            throw new AppError_1.AppError("User dosen't exist");
        }
        ;
        const generateToken = new GenerateTokenController_1.GenerateTokenController();
        const token = await generateToken.handle(user.id);
        const forgotPasswordTemplate = path_1.default.resolve(__dirname, "..", "..", "views", "forgot_password.hbs");
        const emailMessenger = new EmailMessenger_1.default();
        await emailMessenger.send({
            to: {
                name: user.name,
                mail: user.mail
            },
            subject: "[Atena] Recuperação de senha",
            templateData: {
                file: forgotPasswordTemplate,
                vars: {
                    name: user.name,
                    link: `http://localhost:3000/reset-password?token=${token === null || token === void 0 ? void 0 : token.token}`
                }
            }
        });
    }
    ;
}
exports.ForgotPasswordService = ForgotPasswordService;
;
