"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentWithdrawsFromClassService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class StudentWithdrawsFromClassService {
    async execute({ classId, studentId }) {
        const user = await prisma_1.default.user.findUnique({ where: { id: studentId } });
        if (!user.roles.includes(client_1.Role.STUDENT)) {
            throw new AppError_1.AppError("User does not have the necessary permission.", 401);
        }
        const relationExists = await prisma_1.default.studentOnClasses.findUnique({ where: { studentId_classId: { studentId, classId } } });
        if (!relationExists) {
            throw new AppError_1.AppError("This student is not in this class.");
        }
        await prisma_1.default.studentOnClasses.delete({ where: { studentId_classId: { studentId, classId } } });
        return {};
    }
}
exports.StudentWithdrawsFromClassService = StudentWithdrawsFromClassService;
