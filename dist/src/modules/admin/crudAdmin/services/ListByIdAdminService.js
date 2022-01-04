"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByIdAdminService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListByIdAdminService {
    async execute(id) {
        const admin = await prisma_1.default.admin.findMany({
            where: { id },
            select: {
                mail: true,
                username: true,
                updatedAt: true,
                id: true,
                createdAt: true,
                password: false,
            },
        });
        return admin;
    }
}
exports.ListByIdAdminService = ListByIdAdminService;
