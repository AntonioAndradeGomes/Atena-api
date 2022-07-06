"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassController = void 0;
const UpdateClassService_1 = require("../services/UpdateClassService");
class UpdateClassController {
    async hundle(request, response) {
        const id = request.params.id;
        const { name, academicYear, period, isRegularClass, professorId, disciplineId, dateEndClass, dateInitClass, } = request.body;
        const userId = request.user_id;
        const service = new UpdateClassService_1.UpdateClassService();
        const result = await service.execute({
            id,
            name,
            academicYear,
            period,
            isRegularClass,
            professorId,
            userId,
            disciplineId,
            dateInitClass,
            dateEndClass
        });
        return response.status(200).json(result);
    }
}
exports.UpdateClassController = UpdateClassController;
