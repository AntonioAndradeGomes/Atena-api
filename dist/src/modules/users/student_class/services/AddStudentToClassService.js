"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStudentToClassService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AddStudentToClassService {
    async execute({ classId, studentId }) {
        const relationExists = await prisma_1.default.studentOnClasses.findUnique({ where: { studentId_classId: { studentId, classId } } });
        if (relationExists) {
            throw new AppError_1.AppError("This student already belongs to that class.");
        }
        const classExist = await prisma_1.default.class.findUnique({ where: { id: classId } });
        if (!classExist) {
            throw new AppError_1.AppError("This class does not exist.");
        }
        const relation = await prisma_1.default.studentOnClasses.create({ data: { studentId, classId }, include: { class: true, student: true } });
        return relation;
    }
}
exports.AddStudentToClassService = AddStudentToClassService;
