"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveEventService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class RetrieveEventService {
    async execute(id) {
        const event = await prisma_1.default.event.findUnique({
            where: {
                id,
            },
            include: { professor: true, class: true, }
        });
        if (!event)
            throw new AppError_1.AppError("Event does not exist.");
        return event;
    }
}
exports.RetrieveEventService = RetrieveEventService;
