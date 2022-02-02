"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProfessorController = void 0;
const ListAllProfessorService_1 = require("../services/ListAllProfessorService");
const ListByIdProfessorService_1 = require("../services/ListByIdProfessorService");
const ListByUserProfessorService_1 = require("../services/ListByUserProfessorService");
class ListProfessorController {
    async listAll(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListAllProfessorService_1.ListAllProfessorService();
        return response.status(200).json(await service.execute({ page }));
    }
    async listById(request, response) {
        const id = request.params.id;
        const service = new ListByIdProfessorService_1.ListByIdProfessorService();
        return response.status(200).json(await service.execute(id));
    }
    async listByUser(request, response) {
        const id = request.user_id;
        const service = new ListByUserProfessorService_1.ListByUserProfessorService();
        return response.status(200).json(await service.execute(id));
    }
}
exports.ListProfessorController = ListProfessorController;
