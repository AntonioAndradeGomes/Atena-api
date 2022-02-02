"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AuthenticateUserService {
    async execute({ mail, password }) {
        let userPrisma = await prisma_1.default.user.findFirst({
            where: {
                mail,
            },
        });
        if (!userPrisma) {
            throw new AppError_1.AppError("Iconrrect email/password combination", 401);
        }
        const passwordConfirmed = await (0, bcryptjs_1.compare)(password, userPrisma.password);
        if (!passwordConfirmed) {
            throw new AppError_1.AppError("Iconrrect email/password combination", 401);
        }
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                id: userPrisma.id,
                name: userPrisma.name,
                mail: userPrisma.mail,
                registration: userPrisma.registration,
                isStudent: userPrisma.isStudent,
                isProfessor: userPrisma.isProfessor,
                isAcademicCenter: userPrisma.isAcademicCenter,
            },
        }, process.env.JWT_SECRET, {
            subject: userPrisma.id,
            expiresIn: "1d",
        });
        delete userPrisma.password;
        return {
            user: userPrisma,
            token,
        };
    }
}
exports.AuthenticateUserService = AuthenticateUserService;
