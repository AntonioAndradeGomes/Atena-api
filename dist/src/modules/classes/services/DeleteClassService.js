"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteClassService {
    async execute({ userId, idClass }) {
        //verificar usuario
        const userRequest = await prisma_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!userRequest) {
            throw new AppError_1.AppError("User not found", 401);
        }
        //verificar se o user é ca ou admin
        if (!userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER) &&
            !userRequest.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const classAlreadyExist = await prisma_1.default.class.findFirst({
            where: {
                id: idClass,
            },
        });
        if (!classAlreadyExist)
            throw new AppError_1.AppError("Class does not exist");
        await prisma_1.default.class.delete({
            where: {
                id: idClass,
            },
        });
        return {};
    }
}
exports.DeleteClassService = DeleteClassService;
