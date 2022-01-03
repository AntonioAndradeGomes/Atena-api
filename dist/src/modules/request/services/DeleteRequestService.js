"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRequestService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteRequestService {
    async execute(id) {
        const request = await prisma_1.default.request.findUnique({ where: { id } });
        if (!request) {
            throw new AppError_1.AppError("Request not found");
        }
        await prisma_1.default.request.delete({ where: { id } });
        return {};
    }
}
exports.DeleteRequestService = DeleteRequestService;
