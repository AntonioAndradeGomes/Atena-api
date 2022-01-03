"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class UpdateAdminService {
    async execute({ id, username, mail, password }) {
        const admin = await prisma_1.default.admin.findUnique({ where: { id } });
        if (!admin) {
            throw new AppError_1.AppError("Admin does not exist");
        }
        if (password) {
            if (password.length < 6) {
                throw new AppError_1.AppError("Admin does not exist");
            }
            else {
                const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
                const adminUp = await prisma_1.default.admin.update({
                    where: { id },
                    data: { mail, username, password: hashedPassword },
                });
                delete adminUp.password;
                return adminUp;
            }
        }
        else {
            const adminUp = await prisma_1.default.admin.update({
                where: { id },
                data: { mail, username },
            });
            delete adminUp.password;
            return adminUp;
        }
    }
}
exports.UpdateAdminService = UpdateAdminService;
