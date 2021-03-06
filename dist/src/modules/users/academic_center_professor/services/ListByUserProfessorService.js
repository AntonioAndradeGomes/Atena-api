"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByUserProfessorService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListByUserProfessorService {
    async execute(idUser) {
        const users = await prisma_1.default.user.findMany({ where: { academicCenterId: idUser, isProfessor: true }, select: {
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
            }, });
        return users;
    }
}
exports.ListByUserProfessorService = ListByUserProfessorService;
