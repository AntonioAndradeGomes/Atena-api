"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class CreateUserService {
    async execute({ adminId, name, mail, registration, caEndDate, caInitDate, password, role }) {
        //verificar se o id é de um admin
        const admin = await prisma_1.default.user.findUnique({ where: { id: adminId } });
        if (!admin) {
            throw new AppError_1.AppError('User not found.', 401);
        }
        if (!admin.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError('User does not have this permission', 401);
        }
        //verificar se o usuario a ser cadastrado já existe
        let user = await prisma_1.default.user.findFirst({
            where: {
                mail,
            }
        });
        if (user) {
            throw new AppError_1.AppError("User already exists.", 400);
        }
        //verificar se o role passado é válido
        const roleExists = ["ADMIN", "STUDENT", "PROFESSOR", "ACADEMIC_CENTER"].find((element) => element == role.toUpperCase());
        if (!roleExists) {
            throw new AppError_1.AppError("Pass a valid permission.");
        }
        //transformar numa lista de roles
        let roleFinal = [client_1.Role[role.toUpperCase()]];
        //se o role passado for de um CA verificar se os dados de data foi passado
        if (roleFinal[0] == client_1.Role.ACADEMIC_CENTER && (!caInitDate || !caEndDate)) {
            throw new AppError_1.AppError("Add academic center student regency.", 400);
        }
        //se o role passado for de um CA passar a ele permissões de estudante
        if (roleFinal[0] == client_1.Role.ACADEMIC_CENTER) {
            roleFinal.push(client_1.Role.STUDENT);
        }
        //se o role passado não for admin, verificar o codigo de registro
        if (!roleFinal.includes(client_1.Role.ADMIN)) {
            if (!registration) {
                throw new AppError_1.AppError("User needs registration.");
            }
            user = await prisma_1.default.user.findFirst({ where: { registration } });
            if (user) {
                throw new AppError_1.AppError("A user with this registration number already exists.");
            }
        }
        //senha fraca
        if (password.length < 6) {
            throw new AppError_1.AppError("Password too weak.", 400);
        }
        //criptografar a senha
        const hashedPassword = await (0, bcryptjs_1.hash)(password, 8);
        //retorno
        user = await prisma_1.default.user.create({
            data: {
                name,
                mail,
                roles: roleFinal,
                registration,
                caEndDate: caEndDate,
                caInitDate: caInitDate,
                password: hashedPassword,
            },
        });
        //TODO: enviar um email falando para o usuario qual sua senha e mandando ele editá-lá
        delete user.password;
        return user;
    }
}
exports.CreateUserService = CreateUserService;
