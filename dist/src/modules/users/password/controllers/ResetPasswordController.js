"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const ResetPasswordService_1 = require("../services/ResetPasswordService");
class ResetPasswordController {
    async hundle(request, response) {
        const { newpassword, token } = request.body;
        const service = new ResetPasswordService_1.ResetPasswordService();
        await service.execute({ token, newpassword });
        return response.status(204).json();
    }
}
exports.ResetPasswordController = ResetPasswordController;
