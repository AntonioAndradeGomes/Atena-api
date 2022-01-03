"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAdminController = void 0;
const ListAllAdminService_1 = require("../services/ListAllAdminService");
const ListByIdAdminService_1 = require("../services/ListByIdAdminService");
class ListAdminController {
    async listAll(request, response) {
        const service = new ListAllAdminService_1.ListAllAdminService();
        return response.json(await service.execute());
    }
    async listById(request, response) {
        const id = request.params.id;
        const service = new ListByIdAdminService_1.ListByIdAdminService();
        return response.json(await service.execute(id));
    }
}
exports.ListAdminController = ListAdminController;
