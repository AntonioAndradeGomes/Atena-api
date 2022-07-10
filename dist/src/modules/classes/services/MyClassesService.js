"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClassesService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class MyClassesService {
    async execute({ page, professorId, active }) {
        const professor = await prisma_1.default.user.findUnique({
            where: { id: professorId },
        });
        if (!professor.roles.includes(client_1.Role.PROFESSOR)) {
            throw new AppError_1.AppError("User does not have this permission.", 401);
        }
        const skip = page * 10 - 10;
        if (active == null) {
            const classes = await prisma_1.default.class.findMany({
                skip,
                take: 10,
                orderBy: [
                    {
                        dateEndClass: "desc",
                    },
                    {
                        updatedAt: "desc",
                    },
                ],
                where: {
                    professorId,
                },
                include: {
                    discipline: true,
                },
            });
            const countClasses = await prisma_1.default.class.count({
                where: { professorId },
            });
            const lastPage = Math.ceil(countClasses / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: `Bringing all the classes taught by the professor: ${professor.name}`,
                actualPage: page,
                actualLength: classes.length,
                total: countClasses,
                lastPage,
                prev,
                next,
                active,
                data: classes,
            };
        }
        if (!active) {
            const classes = await prisma_1.default.class.findMany({
                skip,
                take: 10,
                orderBy: [
                    {
                        dateEndClass: "desc",
                    },
                    {
                        updatedAt: "desc",
                    },
                ],
                where: {
                    professorId,
                    dateEndClass: {
                        lte: new Date(),
                    },
                },
                include: {
                    discipline: true,
                },
            });
            const countClasses = await prisma_1.default.class.count({
                where: {
                    professorId,
                    dateEndClass: {
                        lte: new Date(),
                    },
                },
            });
            const lastPage = Math.ceil(countClasses / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: `Bringing all inactive classes taught by the teacher: ${professor.name}`,
                actualPage: page,
                actualLength: classes.length,
                total: countClasses,
                lastPage,
                prev,
                next,
                active,
                data: classes,
            };
        }
        const classes = await prisma_1.default.class.findMany({
            skip,
            take: 10,
            orderBy: [
                {
                    dateEndClass: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            where: {
                professorId,
                dateEndClass: {
                    gte: new Date(),
                },
            },
            include: {
                discipline: true,
            },
        });
        const countClasses = await prisma_1.default.class.count({
            where: {
                professorId,
                dateEndClass: {
                    gte: new Date(),
                },
            },
        });
        const lastPage = Math.ceil(countClasses / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            message: `Bringing all active classes taught by the teacher: ${professor.name}`,
            actualPage: page,
            actualLength: classes.length,
            total: countClasses,
            lastPage,
            prev,
            next,
            active,
            data: classes,
        };
    }
}
exports.MyClassesService = MyClassesService;
