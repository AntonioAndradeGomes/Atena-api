"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllAdminService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListAllAdminService {
    async execute() {
        const admins = await prisma_1.default.admin.findMany({
            select: {
                mail: true,
                username: true,
                updatedAt: true,
                id: true,
                createdAt: true,
                password: false,
            },
        });
        return admins;
    }
}
exports.ListAllAdminService = ListAllAdminService;
