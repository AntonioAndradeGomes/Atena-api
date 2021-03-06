"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDatesCAService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class UpdateDatesCAService {
    async execute({ studentId, userId, caEndDate, caInitDate }) {
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError_1.AppError("User Request not found", 401);
        }
        if (!user.roles.includes(client_1.Role.ADMIN) &&
            !user.roles.includes(client_1.Role.ACADEMIC_CENTER)) {
            throw new AppError_1.AppError("User does not have the necessary permission.", 401);
        }
        let student = await prisma_1.default.user.findUnique({
            where: { id: studentId },
        });
        if (!student) {
            throw new AppError_1.AppError("User Student not found", 400);
        }
        if (!student.roles.includes(client_1.Role.STUDENT)) {
            throw new AppError_1.AppError("User having updated Academic Center data is not a Student.", 400);
        }
        if (!student.roles.includes(client_1.Role.ACADEMIC_CENTER)) {
            throw new AppError_1.AppError("The user is not an Academic Center.");
        }
        student = await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                caEndDate: caEndDate,
                caInitDate: caInitDate,
            },
        });
        delete student.password;
        return student;
    }
}
exports.UpdateDatesCAService = UpdateDatesCAService;
