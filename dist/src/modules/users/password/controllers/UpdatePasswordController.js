"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordController = void 0;
const UpdatePasswordService_1 = require("../services/UpdatePasswordService");
class UpdatePasswordController {
    async hundle(request, response) {
        const id = request.user_id;
        const { oldpassword, newpassword } = request.body;
        const service = new UpdatePasswordService_1.UpdatePasswordService();
        return response.status(200).json(await service.execute({ id, newpassword, oldpassword }));
    }
}
exports.UpdatePasswordController = UpdatePasswordController;
