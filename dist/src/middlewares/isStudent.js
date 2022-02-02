"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStudent = void 0;
const AppError_1 = require("../errors/AppError");
const prisma_1 = __importDefault(require("../prisma"));
async function isStudent(request, response, next) {
    const idUser = request.user_id;
    const { isStudent } = await prisma_1.default.user.findUnique({
        where: {
            id: idUser,
        }, select: {
            isStudent: true,
        }
    });
    if (!isStudent) {
        throw new AppError_1.AppError('User is not a student, therefore cannot use this feature.', 401);
    }
    return next();
}
exports.isStudent = isStudent;
