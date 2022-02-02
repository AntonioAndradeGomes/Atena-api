"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDisciplineService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateDisciplineService {
    async execute({ id, code, name, initials, courseLoad, academicCenterId, }) {
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
                academicCenterId,
            },
        });
        return discipline;
    }
}
exports.UpdateDisciplineService = UpdateDisciplineService;
