"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const ResetPasswordService_1 = require("../services/ResetPasswordService");
class ResetPasswordController {
    async handle(request, response) {
        const { token, password } = request.body;
        const resetPassword = new ResetPasswordService_1.ResetPasswordService();
        await resetPassword.execute({ token, password });
        return response.status(204).json();
    }
    ;
}
exports.ResetPasswordController = ResetPasswordController;
;
