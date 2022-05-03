"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskController = void 0;
const DeleteTaskService_1 = require("../services/DeleteTaskService");
class DeleteTaskController {
    async hundle(request, response) {
        const id = request.params.id;
        const service = new DeleteTaskService_1.DeleteTaskService();
        return response.status(204).json(await service.execute(id));
    }
}
exports.DeleteTaskController = DeleteTaskController;
