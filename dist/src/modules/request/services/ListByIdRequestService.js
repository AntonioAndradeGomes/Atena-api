"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByIdRequestService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListByIdRequestService {
    async execute(id) {
        const request = await prisma_1.default.request.findUnique({ where: { id } });
        return request;
    }
}
exports.ListByIdRequestService = ListByIdRequestService;
