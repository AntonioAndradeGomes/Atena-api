"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskController = void 0;
const UpdateTaskService_1 = require("../services/UpdateTaskService");
class UpdateTaskController {
    async hundle(request, response) {
        const id = request.params.id;
        const { description, mail, isCheck } = request.body;
        const service = new UpdateTaskService_1.UpdateTaskService();
        return response
            .json(await service.execute({ id, description, mail, isCheck }));
    }
}
exports.UpdateTaskController = UpdateTaskController;
