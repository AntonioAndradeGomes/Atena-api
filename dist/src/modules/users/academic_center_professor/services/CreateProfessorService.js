"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessorService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CreateProfessorService {
    async execute({ academicCenterId, name, mail, registration, password }) {
        let user = await prisma_1.default.user.findFirst({ where: { mail } });
        if (user) {
            throw new AppError_1.AppError("User already exists.", 400);
        }
        if (password.length < 6) {
            throw new AppError_1.AppError("Password too weak.", 400);
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        user = await prisma_1.default.user.create({
            data: {
                name,
                mail,
                isAcademicCenter: false,
                isProfessor: true,
                isStudent: false,
                registration,
                code: null,
                caInitDate: null,
                caEndDate: null,
                password: hashedPassword,
                academicCenterId,
            }
        });
        delete user.password;
        return user;
    }
}
exports.CreateProfessorService = CreateProfessorService;
