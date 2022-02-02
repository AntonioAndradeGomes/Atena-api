"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessorController = void 0;
const UpdateProfessorService_1 = require("../services/UpdateProfessorService");
class UpdateProfessorController {
    async update(request, response) {
        const id = request.params.id;
        const { name, registration, password } = request.body;
        const academicCenterId = request.user_id;
        const service = new UpdateProfessorService_1.UpdateProfessorService();
        return response.json(await service.execute({ id, name, registration, academicCenterId, password }));
    }
}
exports.UpdateProfessorController = UpdateProfessorController;
