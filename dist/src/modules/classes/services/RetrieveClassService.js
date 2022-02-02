"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrieveClassService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class RetrieveClassService {
    async execute(id) {
        const classInstance = await prisma_1.default.class.findUnique({
            where: {
                id,
            },
            include: { academicCenter: true, professor: true, discipline: true },
        });
        if (!classInstance)
            throw new AppError_1.AppError("Class does not exist");
        return classInstance;
    }
}
exports.RetrieveClassService = RetrieveClassService;
