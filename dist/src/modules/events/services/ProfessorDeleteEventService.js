"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorDeleteEventService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class ProfessorDeleteEventService {
    async execute({ id, userId }) {
        const professor = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!professor) {
            throw new AppError_1.AppError("User not found.", 401);
        }
        if (!professor.roles.includes(client_1.Role.PROFESSOR)) {
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
        if (eventAlreadyExists.professorId != professor.id) {
            throw new AppError_1.AppError("Event does not belong to that Professor.");
        }
        await prisma_1.default.event.delete({
            where: {
                id,
            },
        });
        return {};
    }
}
exports.ProfessorDeleteEventService = ProfessorDeleteEventService;
