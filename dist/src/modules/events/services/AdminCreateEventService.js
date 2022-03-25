"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateEventService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class AdminCreateEventService {
    async execute({ title, description, isActive, difficultyLevel, initDate, endDate, userId, classId, }) {
        const admin = await prisma_1.default.user.findUnique({
            where: { id: userId, }
        });
        if (!admin) {
            throw new AppError_1.AppError("Admin not found", 401);
        }
        if (!admin.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const eventAlreadyExists = await prisma_1.default.event.findFirst({
            where: {
                title,
                description,
                isActive,
                difficultyLevel,
                initDate,
                endDate,
                classId,
            },
        });
        if (eventAlreadyExists) {
            throw new AppError_1.AppError("Event already exists");
        }
        const classExists = await prisma_1.default.class.findUnique({
            where: { id: classId },
        });
        if (!classExists) {
            throw new AppError_1.AppError("Class assigned to the event does not exist.");
        }
        const event = await prisma_1.default.event.create({
            data: {
                title,
                description,
                isActive,
                difficultyLevel,
                initDate,
                endDate,
                professorId: classExists.professorId,
                classId,
            },
            include: {
                class: true,
                professor: {
                    select: {
                        password: false,
                        id: true,
                        name: true,
                        mail: true,
                        roles: true,
                        registration: true,
                        code: true,
                        caInitDate: true,
                        caEndDate: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return event;
    }
}
exports.AdminCreateEventService = AdminCreateEventService;
