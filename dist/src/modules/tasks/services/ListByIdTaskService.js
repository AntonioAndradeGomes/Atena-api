"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByIdTaskService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListByIdTaskService {
    async execute(id) {
        const request = await prisma_1.default.task.findUnique({ where: { id } });
        return request;
    }
}
exports.ListByIdTaskService = ListByIdTaskService;
