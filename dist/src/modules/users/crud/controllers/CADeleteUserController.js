"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CADeleteProfessorController = void 0;
const CADeleteProfessorService_1 = require("../services/CADeleteProfessorService");
class CADeleteProfessorController {
    async hundle(request, response) {
        const caId = request.user_id;
        const userDeletedId = request.params.id;
        const service = new CADeleteProfessorService_1.CADeleteProfessorService();
        return response.status(204).json(await service.execute({ caId, userDeletedId }));
    }
}
exports.CADeleteProfessorController = CADeleteProfessorController;
