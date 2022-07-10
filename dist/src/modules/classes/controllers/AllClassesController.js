"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllClassesController = void 0;
const AllClassesService_1 = require("../services/AllClassesService");
class AllClassesController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const active = request.query.active == undefined
            ? null
            : !(request.query.active.toString().toLowerCase() == "false");
        const service = new AllClassesService_1.AllClassesService();
        const result = await service.execute({ page, active });
        return response.status(200).json(result);
    }
}
exports.AllClassesController = AllClassesController;
