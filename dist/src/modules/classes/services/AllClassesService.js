"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllClassesService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class AllClassesService {
    async execute({ page, active }) {
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
                    {
                        name: "asc",
                    },
                ],
                include: {
                    discipline: true,
                    professor: {
                        select: {
                            password: false,
                            id: true,
                            name: true,
                            mail: true,
                            roles: true,
                            registration: true,
                            code: true,
                            caInitDate: true,
                            caEndDate: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
            const countClasses = await prisma_1.default.class.count();
            const lastPage = Math.ceil(countClasses / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: 'Listing all classes in the course.',
                total: countClasses,
                lastPage,
                prev,
                next,
                data: classes,
            };
        }
        if (!active) {
            const classes = await prisma_1.default.class.findMany({
                skip,
                take: 10,
                where: {
                    dateEndClass: {
                        lte: new Date(),
                    },
                },
                orderBy: [
                    {
                        dateEndClass: "desc",
                    },
                    {
                        updatedAt: "desc",
                    },
                    {
                        name: "asc",
                    },
                ],
                include: {
                    discipline: true,
                    professor: {
                        select: {
                            password: false,
                            id: true,
                            name: true,
                            mail: true,
                            roles: true,
                            registration: true,
                            code: true,
                            caInitDate: true,
                            caEndDate: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
            const countClasses = await prisma_1.default.class.count();
            const lastPage = Math.ceil(countClasses / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: 'Listing the inactive classes of the course.',
                total: countClasses,
                lastPage,
                prev,
                next,
                data: classes,
            };
        }
        const classes = await prisma_1.default.class.findMany({
            skip,
            take: 10,
            where: {
                dateEndClass: {
                    gte: new Date(),
                },
            },
            orderBy: [
                {
                    dateEndClass: "desc",
                },
                {
                    updatedAt: "desc",
                },
                {
                    name: "asc",
                },
            ],
            include: {
                discipline: true,
                professor: {
                    select: {
                        password: false,
                        id: true,
                        name: true,
                        mail: true,
                        roles: true,
                        registration: true,
                        code: true,
                        caInitDate: true,
                        caEndDate: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        const countClasses = await prisma_1.default.class.count();
        const lastPage = Math.ceil(countClasses / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            message: 'Listing the active classes of the course.',
            total: countClasses,
            lastPage,
            prev,
            next,
            data: classes,
        };
    }
}
exports.AllClassesService = AllClassesService;
