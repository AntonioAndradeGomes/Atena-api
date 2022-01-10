"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRequestController = void 0;
const ListAllRequestService_1 = require("../services/ListAllRequestService");
const ListByIdRequestService_1 = require("../services/ListByIdRequestService");
class ListRequestController {
    async listAll(request, response) {
        const page = Number(request.query.page) || 1;
        const service = new ListAllRequestService_1.ListAllRequestService();
        return response.json(await service.execute({ page }));
    }
    async listById(request, response) {
        const id = request.params.id;
        const service = new ListByIdRequestService_1.ListByIdRequestService();
        return response.json(await service.execute(id));
    }
}
exports.ListRequestController = ListRequestController;
