"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteEventController = void 0;
const AdminDeleteEventService_1 = require("../services/AdminDeleteEventService");
class AdminDeleteEventController {
    async hundle(request, response) {
        const id = request.params.id;
        const userId = request.user_id;
        const service = new AdminDeleteEventService_1.AdminDeleteEventService();
        return response.status(204).json(await service.execute({ id, userId }));
    }
}
exports.AdminDeleteEventController = AdminDeleteEventController;
