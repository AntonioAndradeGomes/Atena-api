"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateUserController = void 0;
const AdminUpdateUserService_1 = require("../services/AdminUpdateUserService");
class AdminUpdateUserController {
    async hundle(request, response) {
        const adminId = request.user_id;
        const userId = request.params.id;
        const { name, role, registration, caInitDate, caEndDate } = request.body;
        const service = new AdminUpdateUserService_1.AdminUpdateUserService();
        return response
            .status(200)
            .json(await service.execute({
            adminId,
            userId,
            name,
            role,
            registration,
            caEndDate,
            caInitDate,
        }));
    }
}
exports.AdminUpdateUserController = AdminUpdateUserController;
