"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentJoinCaController = void 0;
const StudentJoinCAService_1 = require("../services/StudentJoinCAService");
class StudentJoinCaController {
    async hundle(request, response) {
        const userId = request.user_id;
        const studentId = request.params.id;
        const { caEndDate, caInitDate } = request.body;
        const service = new StudentJoinCAService_1.StudentJoinCAService();
        return response.status(200).json(await service.execute({ userId, studentId, caEndDate, caInitDate }));
    }
}
exports.StudentJoinCaController = StudentJoinCaController;
