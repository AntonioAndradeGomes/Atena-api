"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateTaskService {
    async execute({ description, mail, isCheck }) {
        const request = await prisma_1.default.task.create({ data: { mail, description, isCheck } });
        return request;
    }
}
exports.CreateTaskService = CreateTaskService;
