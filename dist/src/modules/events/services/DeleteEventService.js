"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteEventService {
    async execute(id, professorId) {
        const eventAlreadyExists = await prisma_1.default.event.findFirst({
            where: {
                id
            }
        });
        if (!eventAlreadyExists) {
            throw new AppError_1.AppError("Event does not exist");
        }
        if (eventAlreadyExists.professorId != professorId) {
            throw new AppError_1.AppError("You are not authorized to do this action.", 401);
        }
        const event = prisma_1.default.event.delete({
            where: {
                id
            }
        });
        return {
            message: "Event deleted successfully"
        };
    }
    ;
}
exports.DeleteEventService = DeleteEventService;
;
