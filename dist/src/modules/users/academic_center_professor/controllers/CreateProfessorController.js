"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessorController = void 0;
const CreateProfessorService_1 = require("../services/CreateProfessorService");
class CreateProfessorController {
    async create(request, response) {
        const { name, mail, registration, password } = request.body;
        const academicCenterId = request.user_id;
        const service = new CreateProfessorService_1.CreateProfessorService();
        const result = await service.execute({ academicCenterId, name, mail, registration, password });
        return response.status(201).json(result);
    }
}
exports.CreateProfessorController = CreateProfessorController;
