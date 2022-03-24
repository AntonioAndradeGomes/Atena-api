"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteUserController = void 0;
const AdminDeleteUserService_1 = require("../services/AdminDeleteUserService");
class AdminDeleteUserController {
    async hundle(request, response) {
        const adminId = request.user_id;
        const userDeletedId = request.params.id;
        const service = new AdminDeleteUserService_1.AdminDeleteUserService();
        return response.status(204).json(await service.execute({ adminId, userDeletedId }));
    }
}
exports.AdminDeleteUserController = AdminDeleteUserController;
