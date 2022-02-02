"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
class AuthenticateUserController {
    async handle(request, response) {
        const { mail, password } = request.body;
        const service = new AuthenticateUserService_1.AuthenticateUserService();
        const result = await service.execute({ mail, password });
        return response.json(result);
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
