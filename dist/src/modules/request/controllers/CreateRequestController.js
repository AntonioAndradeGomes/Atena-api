"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestController = void 0;
const CreateRequestService_1 = require("../services/CreateRequestService");
class CreateRequestController {
    async hundle(request, response) {
        const { description, mail, isCheck } = request.body;
        const service = new CreateRequestService_1.CreateRequestService();
        return response.status(201).json(await service.execute({ description, mail, isCheck }));
    }
}
exports.CreateRequestController = CreateRequestController;
