"use strict";
//o centro academico atualizar dados do professor
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfessorService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class UpdateProfessorService {
    async execute({ id, name, registration, academicCenterId, password }) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError_1.AppError("Professor doesn't exist", 400);
        }
        if (!user.isProfessor) {
            throw new AppError_1.AppError("Professor doesn't exist", 401);
        }
        if (password) {
            if (password.length < 6) {
                throw new AppError_1.AppError("Password too weak.", 400);
            }
            else {
                const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
                const userUp = await prisma_1.default.user.update({ where: { id }, data: { registration, name, password: hashedPassword, academicCenterId }, });
                delete userUp.password;
                return userUp;
            }
        }
        else {
            const userUp = await prisma_1.default.user.update({ where: { id }, data: { registration, name, academicCenterId }, });
            delete userUp.password;
            return userUp;
        }
    }
}
exports.UpdateProfessorService = UpdateProfessorService;
