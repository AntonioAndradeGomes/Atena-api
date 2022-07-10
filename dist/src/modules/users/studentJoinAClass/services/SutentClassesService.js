"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SutentClassesService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../../prisma"));
class SutentClassesService {
    async execute({ studentId, active, page }) {
        const student = await prisma_1.default.user.findUnique({
            where: { id: studentId },
        });
        if (!student) {
            throw new AppError_1.AppError("User not found.");
        }
        if (!student.roles.includes(client_1.Role.STUDENT)) {
            throw new AppError_1.AppError("User not found.");
        }
        const skip = page * 10 - 10;
        if (active == null) {
            const classes = await prisma_1.default.studentOnClasses.findMany({
                skip,
                take: 10,
                where: { studentId: studentId },
                select: {
                    class: {
                        select: {
                            id: true,
                            name: true,
                            academicCenterId: true,
                            academicYear: true,
                            createdAt: true,
                            dateEndClass: true,
                            dateInitClass: true,
                            discipline: true,
                            disciplineId: true,
                            isRegularClass: true,
                            period: true,
                            professorId: true,
                            professor: {
                                select: {
                                    academicCenterId: true,
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
                            updatedAt: true,
                        },
                    },
                    classId: true,
                    createdAt: true,
                    student: {
                        select: {
                            academicCenterId: true,
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
                    studentId: true,
                    updatedAt: true,
                },
                orderBy: [
                    {
                        class: {
                            dateEndClass: "desc",
                        },
                    },
                    {
                        class: {
                            updatedAt: "desc",
                        },
                    },
                    {
                        class: {
                            name: "asc",
                        },
                    },
                    {
                        updatedAt: "desc",
                    },
                ],
            });
            const countStudentsOnClasses = await prisma_1.default.studentOnClasses.count({
                where: { studentId: studentId },
            });
            const lastPage = Math.ceil(countStudentsOnClasses / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                total: countStudentsOnClasses,
                actualLength: classes.length,
                lastPage,
                prev,
                next,
                active,
                data: classes,
            };
        }
        if (!active) {
            const classes = await prisma_1.default.studentOnClasses.findMany({
                skip,
                take: 10,
                where: {
                    studentId: studentId,
                    class: {
                        dateEndClass: {
                            lte: new Date(),
                        },
                    },
                },
                select: {
                    class: {
                        select: {
                            id: true,
                            name: true,
                            academicCenterId: true,
                            academicYear: true,
                            createdAt: true,
                            dateEndClass: true,
                            dateInitClass: true,
                            discipline: true,
                            disciplineId: true,
                            isRegularClass: true,
                            period: true,
                            professorId: true,
                            professor: {
                                select: {
                                    academicCenterId: true,
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
                            updatedAt: true,
                        },
                    },
                    classId: true,
                    createdAt: true,
                    student: {
                        select: {
                            academicCenterId: true,
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
                    studentId: true,
                    updatedAt: true,
                },
                orderBy: [
                    {
                        class: {
                            dateEndClass: "desc",
                        },
                    },
                    {
                        class: {
                            updatedAt: "desc",
                        },
                    },
                    {
                        class: {
                            name: "asc",
                        },
                    },
                    {
                        updatedAt: "desc",
                    },
                ],
            });
            const countStudentsOnClasses = await prisma_1.default.studentOnClasses.count({
                where: {
                    studentId: studentId,
                    class: {
                        dateEndClass: {
                            lte: new Date(),
                        },
                    },
                },
            });
            const lastPage = Math.ceil(countStudentsOnClasses / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                total: countStudentsOnClasses,
                actualLength: classes.length,
                lastPage,
                prev,
                next,
                active,
                data: classes,
            };
        }
        const classes = await prisma_1.default.studentOnClasses.findMany({
            skip,
            take: 10,
            where: {
                studentId: studentId,
                class: {
                    dateEndClass: {
                        gte: new Date(),
                    },
                },
            },
            select: {
                class: {
                    select: {
                        id: true,
                        name: true,
                        academicCenterId: true,
                        academicYear: true,
                        createdAt: true,
                        dateEndClass: true,
                        dateInitClass: true,
                        discipline: true,
                        disciplineId: true,
                        isRegularClass: true,
                        period: true,
                        professorId: true,
                        professor: {
                            select: {
                                academicCenterId: true,
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
                        updatedAt: true,
                    },
                },
                classId: true,
                createdAt: true,
                student: {
                    select: {
                        academicCenterId: true,
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
                studentId: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    class: {
                        dateEndClass: "desc",
                    },
                },
                {
                    class: {
                        updatedAt: "desc",
                    },
                },
                {
                    class: {
                        name: "asc",
                    },
                },
                {
                    updatedAt: "desc",
                },
            ],
        });
        const countStudentsOnClasses = await prisma_1.default.studentOnClasses.count({
            where: {
                studentId: studentId,
                class: {
                    dateEndClass: {
                        gte: new Date(),
                    },
                },
            },
        });
        const lastPage = Math.ceil(countStudentsOnClasses / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            total: countStudentsOnClasses,
            actualLength: classes.length,
            lastPage,
            prev,
            next,
            active,
            data: classes,
        };
    }
}
exports.SutentClassesService = SutentClassesService;
