"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AuthenticationService {
    async execute({ mail, password }) {
        const user = await prisma_1.default.user.findUnique({ where: { mail } });
        if (!user) {
            throw new AppError_1.AppError("Iconrrect email/password combination", 401);
        }
        const passwordConfirmed = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError_1.AppError("Iconrrect email/password combination", 401);
        }
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                id: user.id,
                name: user.name,
                mail: user.mail,
                roles: user.roles,
            },
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d",
        });
        delete user.password;
        return {
            user,
            token,
        };
    }
}
exports.AuthenticationService = AuthenticationService;
