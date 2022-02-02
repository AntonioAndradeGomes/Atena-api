"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExpiredAtAccessCodeService = void 0;
const moment_1 = __importDefault(require("moment"));
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class UpdateExpiredAtAccessCodeService {
    async execute({ id, expiredAt }) {
        let accessCode = await prisma_1.default.accessCode.findUnique({ where: { id } });
        if (!accessCode) {
            throw new AppError_1.AppError('this access code does not exist');
        }
        const diff = moment_1.default.duration((0, moment_1.default)(new Date(expiredAt)).diff((0, moment_1.default)(accessCode.createdAt))).asDays();
        if (diff < 2) {
            throw new AppError_1.AppError('the difference between the access code creation date and the expiration date must be greater than two days', 422);
        }
        accessCode = await prisma_1.default.accessCode.update({ where: { id }, data: { expiredAt } });
        return accessCode;
    }
}
exports.UpdateExpiredAtAccessCodeService = UpdateExpiredAtAccessCodeService;
