"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveEventController = void 0;
const RetrieveEventService_1 = require("../services/RetrieveEventService");
class RetrieveEventController {
    async hundle(request, response) {
        const id = request.params.id;
        const serivce = new RetrieveEventService_1.RetrieveEventService();
        const result = await serivce.execute(id);
        return response.status(200).json(result);
    }
}
exports.RetrieveEventController = RetrieveEventController;
