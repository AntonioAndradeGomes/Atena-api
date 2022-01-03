"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfessor = void 0;
const AppError_1 = require("../errors/AppError");
const prisma_1 = __importDefault(require("../prisma"));
async function isProfessor(request, response, next) {
    const idUser = request.user_id;
    const { isProfessor } = await prisma_1.default.user.findUnique({
        where: {
            id: idUser,
        }, select: {
            isProfessor: true,
        }
    });
    if (!isProfessor) {
        throw new AppError_1.AppError('User is not a professor, therefore cannot use this feature.', 401);
    }
    return next();
}
exports.isProfessor = isProfessor;
