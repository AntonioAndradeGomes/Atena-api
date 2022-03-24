"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDeleteEventService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class AdminDeleteEventService {
    async execute({ id, userId }) {
        const admin = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!admin) {
            throw new AppError_1.AppError("User not found.", 401);
        }
        if (!admin.roles.includes(client_1.Role.ADMIN)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const eventAlreadyExists = await prisma_1.default.event.findFirst({
            where: {
                id,
            },
        });
        if (!eventAlreadyExists) {
            throw new AppError_1.AppError("Event does not exist");
        }
        await prisma_1.default.event.delete({
            where: {
                id,
            },
        });
        return {};
    }
}
exports.AdminDeleteEventService = AdminDeleteEventService;
