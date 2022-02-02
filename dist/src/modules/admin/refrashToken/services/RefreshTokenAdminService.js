"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenAdminService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class RefreshTokenAdminService {
    async execute(id) {
        const admin = await prisma_1.default.admin.findUnique({ where: { id } });
        if (!admin) {
            throw new AppError_1.AppError("Unable to generate token", 401);
        }
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                id: admin.id,
                name: admin.username,
                mail: admin.mail,
            },
        }, process.env.JWT_SECRET, {
            subject: admin.id,
            expiresIn: "2d",
        });
        delete admin.password;
        return {
            user: admin,
            token,
        };
    }
}
exports.RefreshTokenAdminService = RefreshTokenAdminService;
