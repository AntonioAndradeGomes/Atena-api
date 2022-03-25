"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CADeleteProfessorService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CADeleteProfessorService {
    async execute({ userDeletedId, caId }) {
        const userDeleted = await prisma_1.default.user.findUnique({
            where: { id: userDeletedId },
        });
        if (!userDeleted) {
            throw new AppError_1.AppError("User to be deleted does not exist");
        }
        const ca = await prisma_1.default.user.findUnique({
            where: { id: caId },
        });
        if (!ca) {
            throw new AppError_1.AppError("Academic Center not found.");
        }
        if (!ca.roles.includes(client_1.Role.ACADEMIC_CENTER)) {
            throw new AppError_1.AppError("User cannot use this feature.", 401);
        }
        if (!userDeleted.roles.includes(client_1.Role.PROFESSOR)) {
            throw new AppError_1.AppError("Academic Center cannot use this feature.", 401);
        }
        await prisma_1.default.user.delete({ where: { id: userDeletedId } });
        return {};
    }
}
exports.CADeleteProfessorService = CADeleteProfessorService;
