"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorCreateEventController = void 0;
const ProfessorCreateEventService_1 = require("../services/ProfessorCreateEventService");
class ProfessorCreateEventController {
    async hundle(request, response) {
        const { title, description, isActive, difficultyLevel, initDate, endDate, classId, } = request.body;
        const professorId = request.user_id;
        const service = new ProfessorCreateEventService_1.ProfessorCreateEventService();
        return response
            .status(201)
            .json(await service.execute({
            title,
            description,
            isActive,
            difficultyLevel,
            initDate,
            endDate,
            professorId,
            classId,
        }));
    }
}
exports.ProfessorCreateEventController = ProfessorCreateEventController;
