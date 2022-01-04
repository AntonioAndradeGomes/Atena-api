"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEventsService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllEventsService {
    async execute() {
        const events = await prisma_1.default.event.findMany();
        return events;
    }
}
exports.AllEventsService = AllEventsService;
