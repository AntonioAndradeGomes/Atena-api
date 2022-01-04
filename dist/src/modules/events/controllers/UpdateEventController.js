"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventController = void 0;
const UpdateEventService_1 = require("../services/UpdateEventService");
class UpdateEventController {
    async handle(request, response) {
        const id = request.params.id;
        const professorId = request.user_id;
        const { title, description, isActive, difficultyLevel, initDate, endDate, classId } = request.body;
        const service = new UpdateEventService_1.UpdateEventService();
        const result = await service.execute({ id, professorId, title, description, isActive, difficultyLevel, initDate, endDate, classId });
        return response.status(200).json(result);
    }
    ;
}
exports.UpdateEventController = UpdateEventController;
;
