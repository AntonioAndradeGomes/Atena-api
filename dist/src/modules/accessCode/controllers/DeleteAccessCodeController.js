"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccessCodeController = void 0;
const DeleteAccessCodeService_1 = require("../services/DeleteAccessCodeService");
class DeleteAccessCodeController {
    async delete(request, response) {
        const { id } = request.params;
        const service = new DeleteAccessCodeService_1.DeleteAccessCodeService();
        return response.status(204).json(await service.execute(id));
    }
}
exports.DeleteAccessCodeController = DeleteAccessCodeController;
