"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentController = void 0;
const CreateUserStudentService_1 = require("../services/CreateUserStudentService");
class CreateStudentController {
    async hundle(request, response) {
        const { name, mail, password, registration, code } = request.body;
        const service = new CreateUserStudentService_1.CreateUserStudentService();
        return response
            .status(201)
            .json(await service.execute({
            name,
            mail,
            password,
            registration,
            code,
        }));
    }
}
exports.CreateStudentController = CreateStudentController;
