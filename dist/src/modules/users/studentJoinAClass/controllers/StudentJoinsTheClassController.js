"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentJoinsTheClassController = void 0;
const StudentJoinsTheClassSerivice_1 = require("../services/StudentJoinsTheClassSerivice");
class StudentJoinsTheClassController {
    async hundle(request, response) {
        const studentId = request.user_id;
        const { classId } = request.body;
        const service = new StudentJoinsTheClassSerivice_1.StudentJoinsTheClassSerivice();
        return response.status(201).json(await service.execute({ studentId, classId }));
    }
}
exports.StudentJoinsTheClassController = StudentJoinsTheClassController;
