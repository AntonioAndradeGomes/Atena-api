"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDisciplineController = void 0;
const CreateDisciplineService_1 = require("../services/CreateDisciplineService");
class CreateDisciplineController {
    async handle(request, response) {
        const { code, name, initials, courseLoad } = request.body;
        const academicCenterId = request.user_id;
        const service = new CreateDisciplineService_1.CreateDisciplineService();
        const result = await service.execute({
            code,
            name,
            initials,
            courseLoad,
            academicCenterId,
        });
        return response.status(201).json(result);
    }
}
exports.CreateDisciplineController = CreateDisciplineController;
