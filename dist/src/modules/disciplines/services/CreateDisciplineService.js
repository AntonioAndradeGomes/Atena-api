"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDisciplineService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateDisciplineService {
    async execute({ code, name, initials, courseLoad, userId }) {
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
        const disciplineAlreadyExists = await prisma_1.default.discipline.findFirst({
            where: {
                code,
                name,
                initials,
                courseLoad,
            },
        });
        if (disciplineAlreadyExists)
            throw new AppError_1.AppError("Discipline already exists");
        const discipline = await prisma_1.default.discipline.create({
            data: {
                code,
                name,
                initials,
                courseLoad,
                academicCenterId: userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER)
                    ? userRequest.id
                    : null,
            },
        });
        return discipline;
    }
}
exports.CreateDisciplineService = CreateDisciplineService;
