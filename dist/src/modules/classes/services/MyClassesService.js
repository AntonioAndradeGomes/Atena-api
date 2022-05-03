"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClassesService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class MyClassesService {
    async execute({ page, professorId }) {
        const skip = page * 10 - 10;
        const classes = await prisma_1.default.class.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    updatedAt: "desc",
                },
            ],
            where: {
                professorId
            },
            include: {
                discipline: true,
            },
        });
        const countClasses = await prisma_1.default.class.count({ where: { professorId } });
        const lastPage = Math.ceil(countClasses / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            actualPage: page,
            actualLength: classes.length,
            total: countClasses,
            lastPage,
            prev,
            next,
            data: classes,
        };
    }
}
exports.MyClassesService = MyClassesService;
