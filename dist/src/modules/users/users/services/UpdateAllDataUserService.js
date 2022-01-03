"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAllDataUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class UpdateAllDataUserService {
    async execute({ id, name, isStudent, isAcademicCenter, isProfessor, registration, code, caEndDate, caInitDate, password }) {
        const user = prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError_1.AppError('User does not exist');
        }
        if (isStudent && isProfessor && isAcademicCenter) {
            throw new AppError_1.AppError('Usuário não pode ter os três tipos', 400);
        }
        if (isStudent && !code) {
            throw new AppError_1.AppError("Student needs a code", 400);
        }
        if (isAcademicCenter && (!caInitDate || !caEndDate)) {
            throw new AppError_1.AppError("Add academic center student regency", 400);
        }
        if (password) {
            if (password.length < 6) {
                throw new AppError_1.AppError("Password too weak.", 400);
            }
            else {
                const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
                const userUp = await prisma_1.default.user.update({ where: { id }, data: { registration, name, password: hashedPassword }, });
                delete userUp.password;
                return userUp;
            }
        }
        else {
            const userUp = await prisma_1.default.user.update({ where: { id }, data: { registration, name }, });
            delete userUp.password;
            return userUp;
        }
    }
}
exports.UpdateAllDataUserService = UpdateAllDataUserService;
