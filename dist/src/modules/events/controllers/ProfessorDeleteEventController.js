"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorDeleteEventController = void 0;
const ProfessorDeleteEventService_1 = require("../services/ProfessorDeleteEventService");
class ProfessorDeleteEventController {
    async handle(request, response) {
        const id = request.params.id;
        const userId = request.user_id;
        const service = new ProfessorDeleteEventService_1.ProfessorDeleteEventService();
        const result = await service.execute({ id, userId });
        return response.status(204).json(result);
    }
    ;
}
exports.ProfessorDeleteEventController = ProfessorDeleteEventController;
;
