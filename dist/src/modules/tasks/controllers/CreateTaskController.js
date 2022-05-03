"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskController = void 0;
const CreateTaskService_1 = require("../services/CreateTaskService");
class CreateTaskController {
    async hundle(request, response) {
        const { description, mail, isCheck } = request.body;
        const service = new CreateTaskService_1.CreateTaskService();
        return response.status(201).json(await service.execute({ description, mail, isCheck }));
    }
}
exports.CreateTaskController = CreateTaskController;
