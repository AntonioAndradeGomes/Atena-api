"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAdminController = void 0;
const DeleteAdminService_1 = require("../services/DeleteAdminService");
class DeleteAdminController {
    async execute(request, response) {
        const id = request.params.id;
        const service = new DeleteAdminService_1.DeleteAdminService();
        return response.json(await service.execute(id));
    }
}
exports.DeleteAdminController = DeleteAdminController;
