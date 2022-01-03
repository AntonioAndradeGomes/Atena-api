"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdminService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AuthAdminService {
    async execute({ mail, password }) {
        let admin = await prisma_1.default.admin.findFirst({
            where: {
                mail,
            },
        });
        if (!admin) {
            throw new AppError_1.AppError("Iconrrect email/password combination", 401);
        }
        const passwordConfirmed = await (0, bcryptjs_1.compare)(password, admin.password);
        if (!passwordConfirmed) {
            throw new AppError_1.AppError("Iconrrect email/password combination", 401);
        }
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                id: admin.id,
                username: admin.username,
                mail: admin.mail
            },
        }, process.env.JWT_SECRET_ADMIN, {
            subject: admin.id,
            expiresIn: "1d",
        });
        delete admin.password;
        return {
            user: admin,
            token,
        };
    }
}
exports.AuthAdminService = AuthAdminService;
