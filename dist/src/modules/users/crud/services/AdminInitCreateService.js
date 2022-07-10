"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInitCreateService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AdminInitCreateService {
    async execute({ jwtsecret }) {
        const countAdmin = await prisma_1.default.user.count({ where: {
                roles: { has: client_1.Role.ADMIN }
            } });
        if (countAdmin != 0) {
            throw new AppError_1.AppError("There is already a user of type Admin in the system.");
        }
        if (jwtsecret != process.env.JWT_SECRET) {
            throw new AppError_1.AppError("No token needed to create first admin");
        }
        const hashedPassword = await (0, bcryptjs_1.hash)('adminadmin', 8);
        const admim = await prisma_1.default.user.create({
            data: {
                name: 'ADMIN',
                mail: 'admin@admin.com',
                password: hashedPassword,
                roles: [client_1.Role.ADMIN],
            }
        });
        delete admim.password;
        return admim;
    }
}
exports.AdminInitCreateService = AdminInitCreateService;
