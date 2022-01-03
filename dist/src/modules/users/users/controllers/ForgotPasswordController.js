"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordController = void 0;
const ForgotPasswordService_1 = require("../services/ForgotPasswordService");
class ForgotPasswordController {
    async handle(request, response) {
        const { mail } = request.body;
        const ForgotPasswordEmail = new ForgotPasswordService_1.ForgotPasswordService();
        await ForgotPasswordEmail.execute({ mail });
        return response.status(204).json();
    }
    ;
}
exports.ForgotPasswordController = ForgotPasswordController;
;
