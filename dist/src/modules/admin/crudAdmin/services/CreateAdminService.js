"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CreateAdminService {
    async execute({ username, mail, password }) {
        let admin = await prisma_1.default.admin.findFirst({
            where: { OR: [{ mail }, { username }] },
        });
        if (admin) {
            throw new AppError_1.AppError("There is already admin with this data.");
        }
        if (password.length < 6) {
            throw new AppError_1.AppError("Weak password");
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        admin = await prisma_1.default.admin.create({
            data: { mail, username, password: hashedPassword },
        });
        delete admin.password;
        return admin;
    }
}
exports.CreateAdminService = CreateAdminService;
