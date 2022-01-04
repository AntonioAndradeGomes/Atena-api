"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class DeleteUserService {
    async execute(id) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError_1.AppError('User does not exist');
        }
        await prisma_1.default.user.delete({ where: { id } });
        return { message: "User deleted successfully" };
    }
}
exports.DeleteUserService = DeleteUserService;
