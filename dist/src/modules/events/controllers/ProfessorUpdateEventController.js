"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorUpdateEventController = void 0;
const ProfessorUpdateEventService_1 = require("../services/ProfessorUpdateEventService");
class ProfessorUpdateEventController {
    async hundle(request, response) {
        const id = request.params.id;
        const userId = request.user_id;
        const { title, description, isActive, difficultyLevel, initDate, endDate, classId, } = request.body;
        const service = new ProfessorUpdateEventService_1.ProfessorUpdateEventService();
        const result = await service.execute({
            id,
            userId,
            title,
            description,
            isActive,
            difficultyLevel,
            initDate,
            endDate,
            classId,
        });
        return response.status(200).json(result);
    }
}
exports.ProfessorUpdateEventController = ProfessorUpdateEventController;
