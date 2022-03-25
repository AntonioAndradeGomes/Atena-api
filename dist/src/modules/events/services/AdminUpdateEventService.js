"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateEventService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class AdminUpdateEventService {
    async execute({ id, userId, title, description, isActive, difficultyLevel, initDate, endDate, classId, }) {
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new AppError_1.AppError("User not found.", 401);
        }
        if (!user.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const eventAlreadyExists = await prisma_1.default.event.findFirst({
            where: {
                id,
            },
        });
        if (!eventAlreadyExists) {
            throw new AppError_1.AppError("Event does not exist");
        }
        // verificar se a nova turma existe
        const classExist = await prisma_1.default.class.findUnique({
            where: { id: classId },
        });
        if (!classExist) {
            throw new AppError_1.AppError("Class assigned to the event does not belong to this teacher.");
        }
        const event = await prisma_1.default.event.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                isActive,
                difficultyLevel,
                initDate,
                endDate,
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
exports.AdminUpdateEventService = AdminUpdateEventService;
