"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminController = void 0;
const CreateAdminService_1 = require("../services/CreateAdminService");
class CreateAdminController {
    async hundle(request, response) {
        const { username, mail, password } = request.body;
        const service = new CreateAdminService_1.CreateAdminService();
        return response.status(201).json(await service.execute({ username, mail, password }));
    }
}
exports.CreateAdminController = CreateAdminController;
