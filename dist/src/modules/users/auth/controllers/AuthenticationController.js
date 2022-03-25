"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const AuthenticationService_1 = require("../services/AuthenticationService");
class AuthenticationController {
    async hundle(request, response) {
        const { mail, password } = request.body;
        const service = new AuthenticationService_1.AuthenticationService();
        return response.status(201).json(await service.execute({ mail, password }));
    }
}
exports.AuthenticationController = AuthenticationController;
