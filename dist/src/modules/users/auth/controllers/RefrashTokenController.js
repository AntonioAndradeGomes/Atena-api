"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const RefrashTokenService_1 = require("../services/RefrashTokenService");
class RefreshTokenController {
    async hundle(request, response) {
        const id = request.user_id;
        const service = new RefrashTokenService_1.RefreshTokenService();
        return response.status(201).json(await service.execute(id));
    }
}
exports.RefreshTokenController = RefreshTokenController;
