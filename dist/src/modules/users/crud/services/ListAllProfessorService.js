"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllProfessorService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListAllProfessorService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const users = await prisma_1.default.user.findMany({
            where: {
                roles: {
                    has: client_1.Role.PROFESSOR,
                }
            },
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
        const countUsers = await prisma_1.default.user.count({ where: {
                roles: {
                    has: client_1.Role.PROFESSOR,
                }
            }, });
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
exports.ListAllProfessorService = ListAllProfessorService;
