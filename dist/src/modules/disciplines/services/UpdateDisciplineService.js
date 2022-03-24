"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDisciplineService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateDisciplineService {
    async execute({ id, code, name, initials, courseLoad, userId, }) {
        //verificar usuario
        const userRequest = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!userRequest) {
            throw new AppError_1.AppError("User not found", 401);
        }
        //verificar se o user é ca ou admin
        if (!userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER) && !userRequest.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const disciplineAlreadyExists = await prisma_1.default.discipline.findUnique({
            where: {
                id,
            },
        });
        if (!disciplineAlreadyExists) {
            throw new AppError_1.AppError("Discipline does not exist");
        }
        const discipline = await prisma_1.default.discipline.update({
            where: {
                id,
            },
            data: {
                code,
                name,
                initials,
                courseLoad,
            },
        });
        return discipline;
    }
}
exports.UpdateDisciplineService = UpdateDisciplineService;
