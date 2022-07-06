"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteUserService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AdminDeleteUserService {
    async execute({ userDeletedId, adminId }) {
        const userDeleted = await prisma_1.default.user.findUnique({
            where: { id: userDeletedId },
        });
        if (!userDeleted) {
            throw new AppError_1.AppError("User to be deleted does not exist");
        }
        const admin = await prisma_1.default.user.findUnique({
            where: { id: adminId },
        });
        if (!admin) {
            throw new AppError_1.AppError("Admin not found.");
        }
        if (!admin.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User cannot use this feature.", 401);
        }
        //todo: seria bom enviar um email falando da deleção
        await prisma_1.default.user.delete({ where: { id: userDeletedId } });
        return {};
    }
}
exports.AdminDeleteUserService = AdminDeleteUserService;
