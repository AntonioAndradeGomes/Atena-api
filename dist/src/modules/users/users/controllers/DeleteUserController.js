"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const DeleteUserService_1 = require("../services/DeleteUserService");
class DeleteUserController {
    async deleteUser(request, response) {
        const id = request.params.id;
        const service = new DeleteUserService_1.DeleteUserService();
        return response.status(204).json(await service.execute(id));
    }
}
exports.DeleteUserController = DeleteUserController;
