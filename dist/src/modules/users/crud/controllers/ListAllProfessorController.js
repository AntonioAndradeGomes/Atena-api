"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllProfessorController = void 0;
const ListAllProfessorService_1 = require("../services/ListAllProfessorService");
class ListAllProfessorController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListAllProfessorService_1.ListAllProfessorService();
        return response.status(200).json(await service.execute({ page }));
    }
}
exports.ListAllProfessorController = ListAllProfessorController;
