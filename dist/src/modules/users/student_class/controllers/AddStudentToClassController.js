"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStudentToClassController = void 0;
const AddStudentToClassService_1 = require("../services/AddStudentToClassService");
class AddStudentToClassController {
    async handle(request, response) {
        const studentId = request.user_id;
        const { classId } = request.body;
        const service = new AddStudentToClassService_1.AddStudentToClassService();
        return response.status(201).json(await service.execute({ studentId, classId }));
    }
}
exports.AddStudentToClassController = AddStudentToClassController;
