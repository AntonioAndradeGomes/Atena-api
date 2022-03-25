"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class UpdateUserService {
    async execute({ userId, name, mail, registration }) {
        let user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError_1.AppError("User not found");
        }
        user = await prisma_1.default.user.update({ where: { id: userId, }, data: { name, registration, } });
    }
}
exports.UpdateUserService = UpdateUserService;
