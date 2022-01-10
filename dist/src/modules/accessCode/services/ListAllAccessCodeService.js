"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllAccessCodeService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListAllAccessCodeService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const accessCodes = await prisma_1.default.accessCode.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    createdAt: "desc"
                }
            ]
        });
        const countAccessCodes = await prisma_1.default.accessCode.count();
        const lastPage = Math.ceil(countAccessCodes / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage ? null : page + 1;
        return {
            "total": countAccessCodes,
            lastPage,
            prev,
            next,
            "data": accessCodes,
        };
    }
}
exports.ListAllAccessCodeService = ListAllAccessCodeService;
