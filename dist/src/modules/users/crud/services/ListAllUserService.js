"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllUsersService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListAllUsersService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const users = await prisma_1.default.user.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    name: "asc"
                }
            ],
            select: {
                academicCenterId: true,
                password: false,
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
        const countUsers = await prisma_1.default.user.count();
        const lastPage = Math.ceil(countUsers / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            "total": countUsers,
            lastPage,
            prev,
            next,
            "data": users,
        };
    }
}
exports.ListAllUsersService = ListAllUsersService;
