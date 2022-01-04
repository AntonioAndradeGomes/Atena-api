"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateController = void 0;
const CreateUserService_1 = require("../services/CreateUserService");
const CreateUserStudentService_1 = require("../services/CreateUserStudentService");
class UserCreateController {
    // TODO: rota só acessivel ao admin -> unico usuario que pode se criar é o estudante
    async create(request, response) {
        const { name, mail, isStudent, isProfessor, isAcademicCenter, registration, code, caEndDate, caInitDate, password } = request.body;
        const service = new CreateUserService_1.CreateUserService();
        const result = await service.execute({ name, mail, isStudent, isProfessor, isAcademicCenter, registration, code, caEndDate, caInitDate, password });
        return response.status(201).json(result);
    }
    async createStudent(request, response) {
        const { name, mail, registration, code, password } = request.body;
        const service = new CreateUserStudentService_1.CreateUserStudentService();
        const result = await service.execute({ name, mail, registration, code, password });
        return response.status(201).json(result);
    }
}
exports.UserCreateController = UserCreateController;
