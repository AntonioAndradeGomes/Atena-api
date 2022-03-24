"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllStudentsController = void 0;
const ListAllStudentsService_1 = require("../services/ListAllStudentsService");
class ListAllStudentsController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListAllStudentsService_1.ListAllStudentsService();
        return response.status(200).json(await service.execute({ page }));
    }
}
exports.ListAllStudentsController = ListAllStudentsController;
