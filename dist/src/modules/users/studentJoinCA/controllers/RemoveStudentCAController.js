"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveStudentCAController = void 0;
const RemoveStudentCAService_1 = require("../services/RemoveStudentCAService");
class RemoveStudentCAController {
    async hundle(request, response) {
        const userId = request.user_id;
        const studentId = request.params.id;
        const service = new RemoveStudentCAService_1.RemoveStudentCAService();
        return response.status(200).json(await service.execute({ userId, studentId, }));
    }
}
exports.RemoveStudentCAController = RemoveStudentCAController;
