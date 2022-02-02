"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDisciplineService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteDisciplineService {
    async execute(id) {
        const disciplineAlreadyExists = await prisma_1.default.discipline.findFirst({
            where: {
                id
            }
        });
        if (!disciplineAlreadyExists)
            throw new AppError_1.AppError("Discipline does not exist");
        const discipline = await prisma_1.default.discipline.delete({
            where: {
                id
            }
        });
        return discipline;
    }
    ;
}
exports.DeleteDisciplineService = DeleteDisciplineService;
;
