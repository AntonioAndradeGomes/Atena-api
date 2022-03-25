"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassController = void 0;
const DeleteClassService_1 = require("../services/DeleteClassService");
class DeleteClassController {
    async hundle(request, response) {
        const idClass = request.params.id;
        const userId = request.user_id;
        const service = new DeleteClassService_1.DeleteClassService();
        const result = await service.execute({ idClass, userId });
        return response.status(204).json(result);
    }
    ;
}
exports.DeleteClassController = DeleteClassController;
;
