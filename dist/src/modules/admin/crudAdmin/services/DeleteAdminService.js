"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAdminService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class DeleteAdminService {
    async execute(id) {
        const admin = await prisma_1.default.admin.findUnique({ where: { id } });
        if (!admin) {
            throw new AppError_1.AppError('Admin does not exist');
        }
        await prisma_1.default.admin.delete({ where: { id } });
        return {};
    }
}
exports.DeleteAdminService = DeleteAdminService;
