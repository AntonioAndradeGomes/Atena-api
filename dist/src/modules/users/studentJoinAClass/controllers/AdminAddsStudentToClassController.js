"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAddsStudentToClassController = void 0;
const AdminAddsStudentToClassService_1 = require("../services/AdminAddsStudentToClassService");
class AdminAddsStudentToClassController {
    async hundle(request, response) {
        const adminId = request.user_id;
        const { classId, studentId } = request.body;
        const service = new AdminAddsStudentToClassService_1.AdminAddsStudentToClassService();
        return response
            .status(201)
            .json(await service.execute({ adminId, classId, studentId }));
    }
}
exports.AdminAddsStudentToClassController = AdminAddsStudentToClassController;
