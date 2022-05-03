"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const UpdateUserService_1 = require("../services/UpdateUserService");
class UpdateUserController {
    async hundle(request, response) {
        const userId = request.user_id;
        const { name } = request.body;
        const service = new UpdateUserService_1.UpdateUserService();
        return response.status(200).json(await service.execute({
            userId,
            name,
        }));
    }
}
exports.UpdateUserController = UpdateUserController;
