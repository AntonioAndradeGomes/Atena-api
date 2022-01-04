"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveDisciplineController = void 0;
const RetrieveDisciplineService_1 = require("../services/RetrieveDisciplineService");
class RetrieveDisciplineController {
    async handle(request, response) {
        const id = request.params.id;
        const service = new RetrieveDisciplineService_1.RetrieveDisciplineService();
        const result = await service.execute(id);
        return response.status(200).json(result);
    }
    ;
}
exports.RetrieveDisciplineController = RetrieveDisciplineController;
;
