"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllEventsService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllEventsService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const events = await prisma_1.default.event.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    title: "asc"
                }
            ]
        });
        const countEvents = await prisma_1.default.event.count();
        const lastPage = Math.ceil(countEvents / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage ? null : page + 1;
        return {
            "total": countEvents,
            lastPage,
            prev,
            next,
            "data": events,
        };
    }
}
exports.AllEventsService = AllEventsService;
