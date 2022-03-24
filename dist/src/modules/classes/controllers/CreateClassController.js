"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassController = void 0;
const CreateClassService_1 = require("../services/CreateClassService");
class CreateClassController {
    async hundle(request, response) {
        const { name, academicYear, period, isRegularClass, professorId, disciplineId, } = request.body;
        const userId = request.user_id;
        const service = new CreateClassService_1.CreateClassService();
        const result = await service.execute({
            name,
            academicYear,
            period,
            isRegularClass,
            professorId,
            userId,
            disciplineId,
        });
        return response.status(201).json(result);
    }
}
exports.CreateClassController = CreateClassController;
