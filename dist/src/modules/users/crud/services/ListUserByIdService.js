"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUserByIdService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListUserByIdService {
    async execute({ userId }) {
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                password: false,
                academicCenterId: true,
                id: true,
                name: true,
                mail: true,
                roles: true,
                registration: true,
                code: true,
                caInitDate: true,
                caEndDate: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return user;
    }
}
exports.ListUserByIdService = ListUserByIdService;
