"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateUserService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class AdminUpdateUserService {
    async execute({ adminId, userId, name, role, registration, caInitDate, caEndDate }) {
        const admin = await prisma_1.default.user.findUnique({ where: { id: adminId } });
        if (!admin) {
            throw new AppError_1.AppError("Admin not found", 401);
        }
        if (!admin.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError('User does not have this permission', 401);
        }
        let user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError_1.AppError("User not found", 400);
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
                throw new AppError_1.AppError("User needs registration");
            }
            user = await prisma_1.default.user.findFirst({ where: { registration } });
            if (user) {
                throw new AppError_1.AppError("There is already a user with this record");
            }
        }
        user = await prisma_1.default.user.update({ where: { id: userId }, data: { name, roles: roleFinal, registration, caInitDate, caEndDate, } });
        delete user.password;
        return user;
    }
}
exports.AdminUpdateUserService = AdminUpdateUserService;
