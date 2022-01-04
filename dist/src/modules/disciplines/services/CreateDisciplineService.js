"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDisciplineService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateDisciplineService {
    async execute({ code, name, initials, courseLoad, academicCenterId }) {
        const disciplineAlreadyExists = await prisma_1.default.discipline.findFirst({
            where: {
                code,
                name,
                initials,
                courseLoad
            }
        });
        if (disciplineAlreadyExists)
            throw new AppError_1.AppError("Discipline already exists");
        const discipline = await prisma_1.default.discipline.create({
            data: {
                code,
                name,
                initials,
                courseLoad,
                academicCenterId,
            },
            include: { academicCenter: true, }
        });
        return discipline;
    }
}
exports.CreateDisciplineService = CreateDisciplineService;
