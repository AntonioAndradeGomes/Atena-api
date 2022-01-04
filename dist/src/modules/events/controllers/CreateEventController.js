"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventController = void 0;
const CreateEventService_1 = require("../services/CreateEventService");
class CreateEventController {
    async handle(request, response) {
        const { title, description, isActive, difficultyLevel, initDate, endDate, classId } = request.body;
        const professorId = request.user_id;
        const service = new CreateEventService_1.CreateEventService();
        return response.status(201).json(await service.execute({ title, description, isActive, difficultyLevel, initDate, endDate, professorId, classId }));
    }
}
exports.CreateEventController = CreateEventController;
