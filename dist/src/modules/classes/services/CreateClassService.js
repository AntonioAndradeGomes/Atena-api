"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateClassService {
    async execute({ name, academicYear, period, isRegularClass, professorId, userId, disciplineId, }) {
        //verificar usuario
        const userRequest = await prisma_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!userRequest) {
            throw new AppError_1.AppError("User not found", 401);
        }
        //verificar se o user é ca ou admin
        if (!userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER) &&
            !userRequest.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const classAlreadyExists = await prisma_1.default.class.findFirst({
            where: {
                name,
                academicYear,
                period,
                isRegularClass,
            },
        });
        if (classAlreadyExists) {
            throw new AppError_1.AppError("Class already exists");
        }
        const professorAlreadyExists = await prisma_1.default.user.findUnique({
            where: { id: professorId },
        });
        if (!professorAlreadyExists) {
            throw new AppError_1.AppError("Professor doesn't exist");
        }
        const disciplineAlreadyExists = await prisma_1.default.discipline.findUnique({
            where: { id: disciplineId },
        });
        if (!disciplineAlreadyExists) {
            throw new AppError_1.AppError("Discipline doesn't exist");
        }
        const classInstance = await prisma_1.default.class.create({
            data: {
                name,
                academicYear,
                period,
                isRegularClass,
                professorId,
                disciplineId,
                academicCenterId: userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER)
                    ? userRequest.id
                    : null,
            },
            include: {
                discipline: true,
                professor: {
                    select: {
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
                },
            },
        });
        return classInstance;
    }
}
exports.CreateClassService = CreateClassService;
