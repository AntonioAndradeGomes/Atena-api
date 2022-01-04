"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateEventService {
    async execute({ id, professorId, title, description, isActive, difficultyLevel, initDate, endDate, classId, }) {
        const eventAlreadyExists = await prisma_1.default.event.findFirst({
            where: {
                id,
            },
        });
        if (!eventAlreadyExists) {
            throw new AppError_1.AppError("Event does not exist");
        }
        //todo : verificar erros nesse linha abaixo
        if (eventAlreadyExists.professorId != professorId) {
            throw new AppError_1.AppError("You are not authorized to do this action.", 401);
        }
        // verificar se a nova turma existe
        const classExist = await prisma_1.default.class.findUnique({ where: { id: classId } });
        if (!classExist) {
            throw new AppError_1.AppError("Class assigned to the event does not belong to this teacher.");
        }
        const event = prisma_1.default.event.update({
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
                classId
            },
        });
        return event;
    }
}
exports.UpdateEventService = UpdateEventService;
