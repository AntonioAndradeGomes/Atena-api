"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEventsController = void 0;
const AllEventsService_1 = require("../services/AllEventsService");
class AllEventsController {
    async handle(request, response) {
        const service = new AllEventsService_1.AllEventsService();
        const result = await service.execute();
        return response.json(result);
    }
}
exports.AllEventsController = AllEventsController;
