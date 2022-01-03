"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveStudentToClassService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class RemoveStudentToClassService {
    async execute({ classId, studentId }) {
        const relationExists = await prisma_1.default.studentOnClasses.findUnique({ where: { studentId_classId: { studentId, classId } } });
        if (!relationExists) {
            throw new AppError_1.AppError("This student is not in this class.");
        }
        await prisma_1.default.studentOnClasses.delete({ where: { studentId_classId: { studentId, classId } } });
        return {};
    }
}
exports.RemoveStudentToClassService = RemoveStudentToClassService;
