"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStudentClassesController = void 0;
const SutentClassesService_1 = require("../services/SutentClassesService");
class ListStudentClassesController {
    async hundle(request, response) {
        const studentId = request.user_id;
        const page = Number(request.query.page) || 1;
        const active = request.query.active == undefined
            ? null
            : !(request.query.active.toString().toLowerCase() == "false");
        const service = new SutentClassesService_1.SutentClassesService();
        const res = await service.execute({ studentId, active, page, });
        return response.json(res);
    }
}
exports.ListStudentClassesController = ListStudentClassesController;
