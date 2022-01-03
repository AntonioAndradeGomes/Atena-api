"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccessCodeService = void 0;
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class DeleteAccessCodeService {
    async execute(id) {
        const code = (await prisma_1.default.accessCode
            .delete({ where: { id } })
            .then((_) => {
            return {
                error: false,
                message: "The access code was successfully deleted.",
            };
        })
            .catch((err) => {
            if (err.meta.cause == "Record to delete does not exist.") {
                return {
                    error: true,
                    message: "Access Code to delete does not exist.",
                };
            }
            return {
                error: true,
                message: "The Access Code cannot be deleted now, try later.",
            };
        }));
        if (code.error) {
            throw new AppError_1.AppError(code.message);
        }
        return { message: code.message };
    }
}
exports.DeleteAccessCodeService = DeleteAccessCodeService;
