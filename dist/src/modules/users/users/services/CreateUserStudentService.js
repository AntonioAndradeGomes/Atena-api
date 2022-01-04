"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserStudentService = void 0;
const bcryptjs_1 = require("bcryptjs");
const moment_1 = __importDefault(require("moment"));
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CreateUserStudentService {
    async execute({ name, mail, registration, code, password }) {
        let userPrisma = await prisma_1.default.user.findFirst({
            where: {
                mail,
            }
        });
        if (userPrisma) {
            throw new AppError_1.AppError('User already exists', 401);
        }
        const accessCode = await prisma_1.default.accessCode.findUnique({ where: { code } });
        if (!accessCode) {
            throw new AppError_1.AppError('Access code does not exist', 401);
        }
        const diff = moment_1.default
            .duration((0, moment_1.default)(accessCode.expiredAt).diff((0, moment_1.default)(new Date())))
            .asDays();
        if (diff < 0) {
            await prisma_1.default.accessCode.delete({ where: { id: accessCode.id } });
            throw new AppError_1.AppError('Invalid access code', 401);
        }
        if (password.length < 6) {
            throw new AppError_1.AppError("Password too weak.", 400);
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        userPrisma = await prisma_1.default.user.create({
            data: {
                isStudent: true,
                isProfessor: false,
                isAcademicCenter: false,
                name,
                mail,
                registration,
                code: accessCode.code,
                password: hashedPassword,
            },
        });
        await prisma_1.default.accessCode.delete({ where: { id: accessCode.id } });
        delete userPrisma.password;
        return userPrisma;
    }
}
exports.CreateUserStudentService = CreateUserStudentService;
