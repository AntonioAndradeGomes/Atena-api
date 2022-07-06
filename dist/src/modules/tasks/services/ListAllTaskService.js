"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllTaskService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListAllTaskService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const requests = await prisma_1.default.task.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    updatedAt: "desc"
                }
            ],
            where: {},
        });
        const countRequests = await prisma_1.default.task.count();
        const lastPage = Math.ceil(countRequests / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            "actualPage": page,
            "actualLength": requests.length,
            "total": countRequests,
            lastPage,
            prev,
            next,
            "data": requests,
        };
    }
}
exports.ListAllTaskService = ListAllTaskService;
