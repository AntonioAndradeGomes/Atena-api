"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentWithdrawsFromClassController = void 0;
const StudentWithdrawsFromClassService_1 = require("../services/StudentWithdrawsFromClassService");
class StudentWithdrawsFromClassController {
    async hundle(request, response) {
        const studentId = request.user_id;
        const classId = request.params.id;
        const service = new StudentWithdrawsFromClassService_1.StudentWithdrawsFromClassService();
        return response.status(204).json(await service.execute({ studentId, classId }));
    }
}
exports.StudentWithdrawsFromClassController = StudentWithdrawsFromClassController;
