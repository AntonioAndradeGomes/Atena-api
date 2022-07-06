"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordService = void 0;
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class UpdatePasswordService {
    async execute({ id, newpassword, oldpassword }) {
        let user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new AppError_1.AppError("User not found.", 401);
        }
        const passwordConfirmed = await (0, bcryptjs_1.compare)(oldpassword, user.password);
        if (!passwordConfirmed) {
            throw new AppError_1.AppError("Iconrrect old password");
        }
        const hashPass = await (0, bcryptjs_1.hash)(newpassword, 8);
        user = await prisma_1.default.user.update({ where: { id }, data: { password: hashPass, } });
        delete user.password;
        return user;
    }
}
exports.UpdatePasswordService = UpdatePasswordService;
