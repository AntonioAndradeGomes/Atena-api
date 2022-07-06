"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAcademicCenterController = void 0;
const ListAllAcademicCenterService_1 = require("../services/ListAllAcademicCenterService");
class ListAcademicCenterController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListAllAcademicCenterService_1.ListAllAcademicCenterService();
        return response.status(200).json(await service.execute({ page }));
    }
}
exports.ListAcademicCenterController = ListAcademicCenterController;
