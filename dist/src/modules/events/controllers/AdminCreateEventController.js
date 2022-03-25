"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateEventController = void 0;
const AdminCreateEventService_1 = require("../services/AdminCreateEventService");
class AdminCreateEventController {
    async handle(request, response) {
        const { title, description, isActive, difficultyLevel, initDate, endDate, classId, } = request.body;
        const userId = request.user_id;
        const service = new AdminCreateEventService_1.AdminCreateEventService();
        return response
            .status(201)
            .json(await service.execute({
            title,
            description,
            isActive,
            difficultyLevel,
            initDate,
            endDate,
            classId,
            userId,
        }));
    }
}
exports.AdminCreateEventController = AdminCreateEventController;
