"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStudentsOnClassService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListStudentsOnClassService {
    async execute({ page }) {
        const skip = (page * 10) - 10;
        const studentsOnClasses = await prisma_1.default.studentOnClasses.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    studentId: "asc"
                }
            ],
            include: {
                class: true,
                student: true
            },
        });
        const countStudentsOnClasses = await prisma_1.default.studentOnClasses.count();
        const lastPage = Math.ceil(countStudentsOnClasses / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage ? null : page + 1;
        return {
            "total": countStudentsOnClasses,
            lastPage,
            prev,
            next,
            "data": studentsOnClasses,
        };
    }
}
exports.ListStudentsOnClassService = ListStudentsOnClassService;
