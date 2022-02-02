"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenAdminController = void 0;
const RefreshTokenAdminService_1 = require("../services/RefreshTokenAdminService");
class RefreshTokenAdminController {
    async handle(request, response) {
        const id = request.user_id;
        const service = new RefreshTokenAdminService_1.RefreshTokenAdminService();
        return response.status(201).json(await service.execute(id));
    }
}
exports.RefreshTokenAdminController = RefreshTokenAdminController;
