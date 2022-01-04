"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventController = void 0;
const DeleteEventService_1 = require("../services/DeleteEventService");
class DeleteEventController {
    async handle(request, response) {
        const id = request.params.id;
        const professorId = request.user_id;
        const service = new DeleteEventService_1.DeleteEventService();
        const result = service.execute(id, professorId);
        return response.status(204).json(result);
    }
    ;
}
exports.DeleteEventController = DeleteEventController;
;
