"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateClassService {
    async execute({ id, name, academicYear, period, isRegularClass, professorId, academicCenterId, disciplineId }) {
        const classAlreadyExist = await prisma_1.default.class.findUnique({
            where: {
                id
            }
        });
        if (!classAlreadyExist)
            throw new AppError_1.AppError("Object not found");
        const professorAlreadyExists = await prisma_1.default.user.findUnique({
            where: { id: professorId },
        });
        if (!professorAlreadyExists) {
            throw new AppError_1.AppError("Professor doesn't exist");
        }
        const disciplineAlreadyExists = await prisma_1.default.discipline.findUnique({ where: { id: disciplineId } });
        if (!disciplineAlreadyExists) {
            throw new AppError_1.AppError("Discipline doesn't exist");
        }
        const classInstance = await prisma_1.default.class.update({
            where: {
                id
            },
            data: {
                name,
                academicYear,
                period,
                isRegularClass,
                professorId,
                academicCenterId,
                disciplineId
            },
            include: { professor: true, academicCenter: true, discipline: true, }
        });
        return classInstance;
    }
}
exports.UpdateClassService = UpdateClassService;
;
