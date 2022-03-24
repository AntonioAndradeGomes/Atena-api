"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserController = void 0;
const ListUserByIdService_1 = require("../services/ListUserByIdService");
const ListAllUserService_1 = require("../services/ListAllUserService");
class ListUserController {
    async hundle(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListAllUserService_1.ListAllUsersService();
        return response.json(await service.execute({ page }));
    }
    async hundleById(request, response) {
        const userId = request.params.id;
        const service = new ListUserByIdService_1.ListUserByIdService();
        return response.json(await service.execute({ userId }));
    }
}
exports.ListUserController = ListUserController;
