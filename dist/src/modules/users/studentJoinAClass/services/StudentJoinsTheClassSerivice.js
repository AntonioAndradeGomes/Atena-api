"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentJoinsTheClassSerivice = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class StudentJoinsTheClassSerivice {
    async execute({ classId, studentId }) {
        const user = await prisma_1.default.user.findUnique({ where: { id: studentId } });
        if (!user) {
            throw new AppError_1.AppError("Student not found.", 400);
        }
        if (!user.roles.includes(client_1.Role.STUDENT)) {
            throw new AppError_1.AppError("User does not have the necessary permission.", 401);
        }
        let relation = await prisma_1.default.studentOnClasses.findUnique({
            where: { studentId_classId: { studentId, classId } },
        });
        if (relation) {
            throw new AppError_1.AppError("This student already belongs to that class.");
        }
        const classExist = await prisma_1.default.class.findUnique({
            where: { id: classId },
        });
        if (!classExist) {
            throw new AppError_1.AppError("This class does not exist.");
        }
        relation = await prisma_1.default.studentOnClasses.create({
            data: { studentId, classId },
            include: { class: true, student: true },
        });
        return relation;
    }
}
exports.StudentJoinsTheClassSerivice = StudentJoinsTheClassSerivice;
