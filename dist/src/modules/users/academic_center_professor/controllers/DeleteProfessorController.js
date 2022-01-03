"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfessorController = void 0;
const DeleteProfessorService_1 = require("../services/DeleteProfessorService");
class DeleteProfessorController {
    async delete(request, response) {
        const id = request.params.id;
        const service = new DeleteProfessorService_1.DeleteProfessorService();
        const result = await service.execute(id);
        return response.status(204).json(result);
    }
}
exports.DeleteProfessorController = DeleteProfessorController;
