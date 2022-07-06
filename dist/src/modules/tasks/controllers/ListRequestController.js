"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTaskController = void 0;
const ListAllTaskService_1 = require("../services/ListAllTaskService");
const ListByIdTaskService_1 = require("../services/ListByIdTaskService");
class ListTaskController {
    async listAll(request, response) {
        const page = Number(request.query.page) || 1;
        const q = request.query.q;
        //console.log(q);
        const service = new ListAllTaskService_1.ListAllTaskService();
        return response.json(await service.execute({ page }));
    }
    async listById(request, response) {
        const id = request.params.id;
        const service = new ListByIdTaskService_1.ListByIdTaskService();
        return response.json(await service.execute(id));
    }
}
exports.ListTaskController = ListTaskController;
