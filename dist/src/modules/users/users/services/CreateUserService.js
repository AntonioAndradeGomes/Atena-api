"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CreateUserService {
    async execute({ name, mail, isStudent, isProfessor, isAcademicCenter, registration, code, caEndDate, caInitDate, password }) {
        let user = await prisma_1.default.user.findFirst({
            where: {
                mail,
            }
        });
        if (user) {
            throw new AppError_1.AppError("User already exists.", 400);
        }
        if (!isStudent && !isProfessor && !isAcademicCenter) {
            throw new AppError_1.AppError('User must have a type.', 400);
        }
        if ((isAcademicCenter && isProfessor) || (isProfessor && isStudent)) {
            throw new AppError_1.AppError('User cannot be teacher and student, or teacher and academic center member.', 400);
        }
        if (isStudent && isProfessor && isAcademicCenter) {
            throw new AppError_1.AppError('User cannot have all three types.', 400);
        }
        if (isStudent && !code) {
            throw new AppError_1.AppError("Student needs a code.", 400);
        }
        if (isAcademicCenter && (!caInitDate || !caEndDate)) {
            throw new AppError_1.AppError("Add academic center student regency.", 400);
        }
        if (password.length < 6) {
            throw new AppError_1.AppError("Password too weak.", 400);
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        user = await prisma_1.default.user.create({
            data: {
                name,
                mail,
                isAcademicCenter,
                isProfessor,
                isStudent,
                registration,
                code,
                caEndDate: caEndDate,
                caInitDate: caInitDate,
                password: hashedPassword,
            },
        });
        delete user.password;
        return user;
    }
}
exports.CreateUserService = CreateUserService;
