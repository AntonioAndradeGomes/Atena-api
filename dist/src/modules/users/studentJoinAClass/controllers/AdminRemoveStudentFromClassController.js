"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRemoveStudentFromClassController = void 0;
const AdminRemovesStudentFromClassService_1 = require("../services/AdminRemovesStudentFromClassService");
class AdminRemoveStudentFromClassController {
    async hundle(request, response) {
        const adminId = request.user_id;
        const { classId, studentId } = request.body;
        const service = new AdminRemovesStudentFromClassService_1.AdminRemovesStudentFromClassService();
        return response.status(204).json(await service.execute({ adminId, classId, studentId, }));
    }
}
exports.AdminRemoveStudentFromClassController = AdminRemoveStudentFromClassController;
