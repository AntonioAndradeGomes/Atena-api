"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllRequestService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListAllRequestService {
    async execute() {
        const requests = await prisma_1.default.request.findMany();
        return requests;
    }
}
exports.ListAllRequestService = ListAllRequestService;
