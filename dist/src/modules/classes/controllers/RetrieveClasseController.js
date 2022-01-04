"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveClassController = void 0;
const RetrieveClassService_1 = require("../services/RetrieveClassService");
class RetrieveClassController {
    async hundle(request, response) {
        const id = request.params.id;
        const service = new RetrieveClassService_1.RetrieveClassService();
        const result = await service.execute(id);
        return response.status(200).json(result);
    }
    ;
}
exports.RetrieveClassController = RetrieveClassController;
;
