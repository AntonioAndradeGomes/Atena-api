"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllAccessCodeService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListAllAccessCodeService {
    async execute() {
        const codes = await prisma_1.default.accessCode.findMany();
        return codes;
    }
}
exports.ListAllAccessCodeService = ListAllAccessCodeService;
