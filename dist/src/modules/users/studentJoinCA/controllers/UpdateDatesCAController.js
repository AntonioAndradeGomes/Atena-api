"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDatesCAController = void 0;
const UpdateDatesCAService_1 = require("../services/UpdateDatesCAService");
class UpdateDatesCAController {
    async hundle(request, response) {
        const userId = request.user_id;
        const studentId = request.params.id;
        const { caEndDate, caInitDate } = request.body;
        const service = new UpdateDatesCAService_1.UpdateDatesCAService();
        return response.status(200).json(await service.execute({ userId, studentId, caEndDate, caInitDate }));
    }
}
exports.UpdateDatesCAController = UpdateDatesCAController;
