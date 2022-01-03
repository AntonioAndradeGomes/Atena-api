"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenController = void 0;
const GenerateTokenService_1 = require("../services/GenerateTokenService");
class GenerateTokenController {
    async handle(userId) {
        const service = new GenerateTokenService_1.GenerateTokenService();
        const result = await service.execute({ userId });
        return result;
    }
}
exports.GenerateTokenController = GenerateTokenController;
;
