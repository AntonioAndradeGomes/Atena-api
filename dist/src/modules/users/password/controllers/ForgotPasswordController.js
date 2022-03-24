"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordController = void 0;
const SendForgotPasswordEmailService_1 = require("../services/SendForgotPasswordEmailService");
class ForgotPasswordController {
    async hundle(request, response) {
        const { mail } = request.body;
        const service = new SendForgotPasswordEmailService_1.SendForgotPasswordEmailService();
        await service.execute({ mail });
        return response.status(204).json();
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
