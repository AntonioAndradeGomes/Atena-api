"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class RefreshTokenService {
    async execute(id) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError_1.AppError("Unable to generate token", 401);
        }
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                id: user.id,
                name: user.name,
                mail: user.mail,
                registration: user.registration,
                isStudent: user.isStudent,
                isProfessor: user.isProfessor,
                isAcademicCenter: user.isAcademicCenter,
            },
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "2d",
        });
        delete user.password;
        return {
            user: user,
            token,
        };
    }
}
exports.RefreshTokenService = RefreshTokenService;
