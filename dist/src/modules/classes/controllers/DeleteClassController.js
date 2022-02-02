"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassController = void 0;
const DeleteClassService_1 = require("../services/DeleteClassService");
class DeleteClassController {
    async hundle(request, response) {
        const id = request.params.id;
        const service = new DeleteClassService_1.DeleteClassService();
        const result = await service.execute(id);
        return response.status(204).json(result);
    }
    ;
}
exports.DeleteClassController = DeleteClassController;
;
