"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateEventService {
    async execute({ title, description, isActive, difficultyLevel, initDate, endDate, professorId, classId }) {
        const eventAlreadyExists = await prisma_1.default.event.findFirst({
            where: {
                title,
                description,
                isActive,
                difficultyLevel,
                initDate,
                endDate,
                professorId,
                classId
            }
        });
        if (eventAlreadyExists)
            throw new AppError_1.AppError("Event already exists");
        const classExists = await prisma_1.default.class.findUnique({ where: { id: classId } });
        if (!classExists) {
            throw new AppError_1.AppError("Class assigned to the event does not exist.");
        }
        if (classExists.professorId == professorId) {
            throw new AppError_1.AppError("Class assigned to the event does not belong to this teacher.");
        }
        const event = await prisma_1.default.event.create({ data: {
                title,
                description,
                isActive,
                difficultyLevel,
                initDate,
                endDate,
                professorId,
                classId
            }, include: { professor: true, class: true } });
        return event;
    }
}
exports.CreateEventService = CreateEventService;
