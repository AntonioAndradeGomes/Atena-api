"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDisciplineController = void 0;
const AllDisciplineService_1 = require("../services/AllDisciplineService");
class AllDisciplineController {
    async handle(request, response) {
        const service = new AllDisciplineService_1.AllDisciplineService();
        const result = await service.execute();
        return response.json(result);
    }
    ;
}
exports.AllDisciplineController = AllDisciplineController;
;
