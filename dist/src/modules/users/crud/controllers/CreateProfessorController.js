"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessorController = void 0;
const CreateProfessorService_1 = require("../services/CreateProfessorService");
class CreateProfessorController {
    async hundle(request, response) {
        const idUser = request.user_id;
        const { name, mail, password, registration } = request.body;
        const service = new CreateProfessorService_1.CreateProfessorService();
        return response
            .status(201)
            .json(await service.execute({
            idUser,
            name,
            mail,
            password,
            registration,
        }));
    }
}
exports.CreateProfessorController = CreateProfessorController;
