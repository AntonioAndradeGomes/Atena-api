"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveStudentToClassController = void 0;
const RemoveStudentToClassService_1 = require("../services/RemoveStudentToClassService");
class RemoveStudentToClassController {
    async handle(request, response) {
        const studentId = request.user_id;
        const { classId } = request.body;
        const service = new RemoveStudentToClassService_1.RemoveStudentToClassService();
        return response.status(204).json(await service.execute({ studentId, classId }));
    }
}
exports.RemoveStudentToClassController = RemoveStudentToClassController;
