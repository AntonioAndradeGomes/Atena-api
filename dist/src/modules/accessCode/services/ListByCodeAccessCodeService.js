"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByCodeAccessCodeService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListByCodeAccessCodeService {
    async execute(code) {
        const access = await prisma_1.default.accessCode.findUnique({ where: { code } });
        return access;
    }
}
exports.ListByCodeAccessCodeService = ListByCodeAccessCodeService;
