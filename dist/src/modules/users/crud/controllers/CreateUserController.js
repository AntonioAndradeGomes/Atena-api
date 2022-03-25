"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../services/CreateUserService");
class CreateUserController {
    async hundle(request, response) {
        const adminId = request.user_id;
        const { name, mail, role, password, registration, caInitDate, caEndDate, } = request.body;
        const service = new CreateUserService_1.CreateUserService();
        return response.status(201).json(await service.execute({
            adminId,
            name,
            mail,
            password,
            registration,
            caEndDate,
            caInitDate,
            role,
        }));
    }
}
exports.CreateUserController = CreateUserController;
