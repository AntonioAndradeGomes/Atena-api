"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClassService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteClassService {
    async execute(id) {
        const classAlreadyExist = await prisma_1.default.class.findFirst({
            where: {
                id
            }
        });
        if (!classAlreadyExist)
            throw new AppError_1.AppError("Class does not exist");
        const classInstance = await prisma_1.default.class.delete({
            where: {
                id
            }
        });
        return { message: "Successfully deleted class" };
    }
    ;
}
exports.DeleteClassService = DeleteClassService;
;
