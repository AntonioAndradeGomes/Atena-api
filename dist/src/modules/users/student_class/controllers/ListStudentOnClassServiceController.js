"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStudentOnClassServiceController = void 0;
const ListStudentsOnClassService_1 = require("../services/ListStudentsOnClassService");
class ListStudentOnClassServiceController {
    async handle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListStudentsOnClassService_1.ListStudentsOnClassService();
        return response.json(await service.execute({ page }));
    }
}
exports.ListStudentOnClassServiceController = ListStudentOnClassServiceController;
