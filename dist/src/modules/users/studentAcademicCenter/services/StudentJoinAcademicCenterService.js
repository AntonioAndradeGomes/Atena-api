"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentJoinAcademicCenterService = void 0;
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class StudentJoinAcademicCenterService {
    async execute({ mail }) {
        const studentAlreadyExists = await prisma_1.default.user.findUnique({
            where: {
                mail
            }
        });
        if (!studentAlreadyExists)
            throw new AppError_1.AppError("Student whit this email does not exist", 400);
        const studentUpdated = await prisma_1.default.user.update({
            where: {
                mail
            },
            data: {
                isAcademicCenter: true
            }
        });
        return studentUpdated;
    }
}
exports.StudentJoinAcademicCenterService = StudentJoinAcademicCenterService;
;
