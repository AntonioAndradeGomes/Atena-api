"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProfessorService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class DeleteProfessorService {
    async execute(id) {
        let user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError_1.AppError("Professor doesn't exist", 400);
        }
        if (!user.isProfessor) {
            throw new AppError_1.AppError("Professor doesn't exist", 401);
        }
        await prisma_1.default.user.delete({ where: { id } });
        return { message: "User deleted successfully" };
    }
}
exports.DeleteProfessorService = DeleteProfessorService;
