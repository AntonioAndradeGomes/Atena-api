"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDisciplineService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllDisciplineService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const disciplines = await prisma_1.default.discipline.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    name: "asc"
                }
            ],
            include: { academicCenter: true },
        });
        const countDisciplines = await prisma_1.default.discipline.count();
        const lastPage = Math.ceil(countDisciplines / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage ? null : page + 1;
        return {
            "total": countDisciplines,
            lastPage,
            prev,
            next,
            "data": disciplines,
        };
    }
}
exports.AllDisciplineService = AllDisciplineService;
