"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByIdProfessorService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListByIdProfessorService {
    async execute(idUser) {
        const user = await prisma_1.default.user.findFirst({ where: { id: idUser, isProfessor: true }, select: {
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
        if (!user) {
            return {
                message: "User with this id does not exist",
            };
        }
        return user;
    }
}
exports.ListByIdProfessorService = ListByIdProfessorService;
