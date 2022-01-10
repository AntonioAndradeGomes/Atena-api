"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentJoinAcademicCenterController = void 0;
const StudentJoinAcademicCenterService_1 = require("../services/StudentJoinAcademicCenterService");
class StudentJoinAcademicCenterController {
    async handle(request, response) {
        const { mail } = request.body;
        const service = new StudentJoinAcademicCenterService_1.StudentJoinAcademicCenterService();
        const result = await service.execute({ mail });
        return response.status(200).json(result);
    }
    ;
}
exports.StudentJoinAcademicCenterController = StudentJoinAcademicCenterController;
;
