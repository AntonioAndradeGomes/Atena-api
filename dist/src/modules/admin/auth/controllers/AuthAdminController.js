"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminController = void 0;
const AuthAdminService_1 = require("../services/AuthAdminService");
class AuthAdminController {
    async handle(request, response) {
        const { mail, password } = request.body;
        const service = new AuthAdminService_1.AuthAdminService();
        const result = await service.execute({ mail, password });
        return response.json(result);
    }
}
exports.AuthAdminController = AuthAdminController;
