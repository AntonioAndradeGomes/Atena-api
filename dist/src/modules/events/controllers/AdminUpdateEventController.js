"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateEventController = void 0;
const AdminUpdateEventService_1 = require("../services/AdminUpdateEventService");
class AdminUpdateEventController {
    async hundle(request, response) {
        const { title, description, isActive, difficultyLevel, initDate, endDate, classId, } = request.body;
        const id = request.params.id;
        const userId = request.user_id;
        const service = new AdminUpdateEventService_1.AdminUpdateEventService();
        return response.status(200).json(await service.execute({
            classId,
            description,
            difficultyLevel,
            endDate,
            id,
            initDate,
            isActive,
            title,
            userId,
        }));
    }
}
exports.AdminUpdateEventController = AdminUpdateEventController;
