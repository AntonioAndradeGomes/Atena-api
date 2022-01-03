"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveDisciplineService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class RetrieveDisciplineService {
    async execute(id) {
        const discipline = await prisma_1.default.discipline.findUnique({
            where: {
                id,
            },
            include: { academicCenter: true },
        });
        if (!discipline)
            throw new AppError_1.AppError("Discipline does not exist");
        return discipline;
    }
}
exports.RetrieveDisciplineService = RetrieveDisciplineService;
