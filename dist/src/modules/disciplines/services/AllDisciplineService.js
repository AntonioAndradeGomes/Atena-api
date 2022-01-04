"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllDisciplineService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllDisciplineService {
    async execute() {
        const disciplines = await prisma_1.default.discipline.findMany({
            include: { academicCenter: true },
        });
        return disciplines;
    }
}
exports.AllDisciplineService = AllDisciplineService;
