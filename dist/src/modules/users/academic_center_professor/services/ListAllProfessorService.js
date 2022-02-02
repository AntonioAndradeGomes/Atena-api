"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllProfessorService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListAllProfessorService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const professors = await prisma_1.default.user.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    mail: "asc"
                }
            ],
            where: {
                isProfessor: true
            },
            select: {
                password: false,
                id: true,
                name: true,
                mail: true,
                isStudent: true,
                isProfessor: true,
                isAcademicCenter: true,
                registration: true,
                code: true,
                caInitDate: true,
                caEndDate: true,
                createdAt: true,
                updatedAt: true,
                academicCenterId: true,
                academicCenter: true,
            }
        });
        const countProfessors = await prisma_1.default.user.count({
            where: { isProfessor: true }
        });
        const lastPage = Math.ceil(countProfessors / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage ? null : page + 1;
        return {
            "total": countProfessors,
            lastPage,
            prev,
            next,
            "data": professors,
        };
    }
}
exports.ListAllProfessorService = ListAllProfessorService;
