"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminController = void 0;
const UpdateAdminService_1 = require("../services/UpdateAdminService");
class UpdateAdminController {
    async hundle(request, response) {
        const id = request.params.id;
        const { username, mail, password } = request.body;
        const service = new UpdateAdminService_1.UpdateAdminService();
        return response.status(201).json(await service.execute({ id, username, mail, password }));
    }
}
exports.UpdateAdminController = UpdateAdminController;
