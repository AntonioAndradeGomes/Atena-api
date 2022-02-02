"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllRequestService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListAllRequestService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const requests = await prisma_1.default.request.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    mail: "asc"
                }
            ]
        });
        const countRequests = await prisma_1.default.request.count();
        const lastPage = Math.ceil(countRequests / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage ? null : page + 1;
        return {
            "total": countRequests,
            lastPage,
            prev,
            next,
            "data": requests,
        };
    }
}
exports.ListAllRequestService = ListAllRequestService;
