"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const RefreshTokenService_1 = require("../services/RefreshTokenService");
class RefreshTokenController {
    async handle(request, response) {
        const id = request.user_id;
        const service = new RefreshTokenService_1.RefreshTokenService();
        return response.status(201).json(await service.execute(id));
    }
}
exports.RefreshTokenController = RefreshTokenController;
