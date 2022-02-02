"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRequestController = void 0;
const UpdateRequestService_1 = require("../services/UpdateRequestService");
class UpdateRequestController {
    async hundle(request, response) {
        const id = request.params.id;
        const { description, mail, isCheck } = request.body;
        const service = new UpdateRequestService_1.UpdateRequestService();
        return response
            .json(await service.execute({ id, description, mail, isCheck }));
    }
}
exports.UpdateRequestController = UpdateRequestController;
