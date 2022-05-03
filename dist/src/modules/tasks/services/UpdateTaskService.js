"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateTaskService {
    async execute({ id, description, mail, isCheck }) {
        let request = await prisma_1.default.task.findUnique({ where: { id } });
        if (!request) {
            throw new AppError_1.AppError("Request not found");
        }
        request = await prisma_1.default.task.update({ where: { id }, data: { description, mail, isCheck } });
        return request;
    }
}
exports.UpdateTaskService = UpdateTaskService;
