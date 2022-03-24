"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const date_fns_1 = require("date-fns");
const prisma_1 = __importDefault(require("../../../../prisma"));
const bcryptjs_1 = require("bcryptjs");
;
class ResetPasswordService {
    async execute({ token, newpassword }) {
        const userToken = await prisma_1.default.userToken.findFirst({
            where: { token }
        });
        if (!userToken) {
            throw new AppError_1.AppError("User token doesn't exist");
        }
        let user = await prisma_1.default.user.findUnique({
            where: {
                id: userToken.userId
            }
        });
        if (!user) {
            throw new AppError_1.AppError("User doesn't exist");
        }
        const tokenLastUpdate = userToken.updateAt;
        const compareDate = (0, date_fns_1.addHours)(tokenLastUpdate, 2);
        if ((0, date_fns_1.isAfter)(Date.now(), compareDate)) {
            throw new AppError_1.AppError("Token expired");
        }
        ;
        const newPass = await (0, bcryptjs_1.hash)(newpassword, 8);
        user = await prisma_1.default.user.update({
            where: {
                id: user.id
            },
            data: {
                password: newPass
            }
        });
        delete user.password;
        return user;
    }
}
exports.ResetPasswordService = ResetPasswordService;
;
