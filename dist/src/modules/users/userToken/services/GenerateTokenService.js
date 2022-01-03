"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
const uuid_1 = require("uuid");
class GenerateTokenService {
    async execute({ userId }) {
        var token = (0, uuid_1.v4)();
        const tokenInstance = await prisma_1.default.userToken.upsert({
            where: {
                userId: userId
            },
            update: {
                token
            },
            create: {
                token,
                userId
            },
        });
        return tokenInstance;
    }
}
exports.GenerateTokenService = GenerateTokenService;
;
