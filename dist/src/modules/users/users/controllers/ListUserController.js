"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserController = void 0;
const ListAllUsersService_1 = require("../services/ListAllUsersService");
const ListUserByIdService_1 = require("../services/ListUserByIdService");
class ListUserController {
    async listAll(request, response) {
        const service = new ListAllUsersService_1.ListAllUsersService();
        return response.json(await service.execute());
    }
    async listById(request, response) {
        const id = request.params.id;
        const service = new ListUserByIdService_1.ListUserByIdService();
        return response.json(await service.execute(id) || {});
    }
}
exports.ListUserController = ListUserController;
