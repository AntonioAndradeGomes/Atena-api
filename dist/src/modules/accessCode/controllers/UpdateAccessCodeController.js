"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccessCodeController = void 0;
const UpdateExpiredAtAccessCodeService_1 = require("../services/UpdateExpiredAtAccessCodeService");
class UpdateAccessCodeController {
    async execute(request, response) {
        const { id } = request.params;
        const { expiredAt } = request.body;
        const service = new UpdateExpiredAtAccessCodeService_1.UpdateExpiredAtAccessCodeService();
        return response.json(await service.execute({ id, expiredAt }));
    }
}
exports.UpdateAccessCodeController = UpdateAccessCodeController;
