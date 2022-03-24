"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProfessorService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CreateProfessorService {
    async execute({ idUser, name, mail, password, registration }) {
        const userRequest = await prisma_1.default.user.findUnique({
            where: { id: idUser },
        });
        if (!userRequest) {
            throw new AppError_1.AppError("Admin or Academic Center not found.", 401);
        }
        if (!userRequest.roles.includes(client_1.Role.ADMIN) &&
            !userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER)) {
            throw new AppError_1.AppError("User does not have permission.", 401);
        }
        let user = await prisma_1.default.user.findFirst({ where: { mail } });
        if (user) {
            throw new AppError_1.AppError("You already have a user with this email.");
        }
        if (password.length < 6) {
            throw new AppError_1.AppError("Password too weak.", 400);
        }
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        user = await prisma_1.default.user.create({
            data: {
                name,
                mail,
                password: hashedPassword,
                registration,
                roles: [client_1.Role.PROFESSOR],
                academicCenterId: userRequest.roles.includes(client_1.Role.ACADEMIC_CENTER)
                    ? userRequest.id
                    : null,
            },
        });
        //TODO: enviar email ao professor com sua senha
        delete user.password;
        return user;
    }
}
exports.CreateProfessorService = CreateProfessorService;
