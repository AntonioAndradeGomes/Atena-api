"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStudentsOnClassService = void 0;
const prisma_1 = __importDefault(require("../../../../prisma"));
class ListStudentsOnClassService {
    async execute() {
        const list = await prisma_1.default.studentOnClasses.findMany({ include: { class: true, student: true } });
        return list;
    }
}
exports.ListStudentsOnClassService = ListStudentsOnClassService;
