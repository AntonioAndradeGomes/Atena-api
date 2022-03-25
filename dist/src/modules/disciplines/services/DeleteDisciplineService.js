"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDisciplineService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteDisciplineService {
    async execute({ idUser, idDiscipline }) {
        const user = await prisma_1.default.user.findUnique({ where: { id: idUser } });
        if (!user) {
            throw new AppError_1.AppError("User not found.", 401);
        }
        //verificar se o user é ca ou admin
        if (!user.roles.includes(client_1.Role.ACADEMIC_CENTER) && !user.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const disciplineAlreadyExists = await prisma_1.default.discipline.findFirst({
            where: {
                id: idDiscipline
            }
        });
        if (!disciplineAlreadyExists)
            throw new AppError_1.AppError("Discipline does not exist");
        await prisma_1.default.discipline.delete({
            where: {
                id: idDiscipline
            }
        });
        return {};
    }
    ;
}
exports.DeleteDisciplineService = DeleteDisciplineService;
;
