"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRequestController = void 0;
const DeleteRequestService_1 = require("../services/DeleteRequestService");
class DeleteRequestController {
    async hundle(request, response) {
        const id = request.params.id;
        const service = new DeleteRequestService_1.DeleteRequestService();
        return response.status(204).json(await service.execute(id));
    }
}
exports.DeleteRequestController = DeleteRequestController;
