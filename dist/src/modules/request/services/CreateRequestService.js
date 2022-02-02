"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class CreateRequestService {
    async execute({ description, mail, isCheck }) {
        const request = await prisma_1.default.request.create({ data: { mail, description, isCheck } });
        return request;
    }
}
exports.CreateRequestService = CreateRequestService;
