"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventsWorkLoadStudentService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class ListEventsWorkLoadStudentService {
    async execute({ timePeriodInit, id, timePeriodEnd }) {
        const student = await prisma_1.default.user.findUnique({ where: { id } });
        if (!student) {
            throw new AppError_1.AppError("User not found", 401);
        }
        if (!student.roles.includes(client_1.Role.STUDENT)) {
            throw new AppError_1.AppError("User not student", 401);
        }
        const events = await prisma_1.default.$queryRaw `
    select e.id, e.title, e.description, e."isActive", e."createdAt", e."updatedAt", e."difficultyLevel",
    e."endDate", e."initDate", e."classId", e."professorId", c.id as "id_class",c."name" as "name_class",
    c."academicYear" as "academic_year_class", c."period" as "period_class", c."disciplineId"
    from users u
    INNER JOIN "students_on_classes" soc on soc."studentId" = u.id
    inner join "classes" c 
    on c.id = soc."classId" 
    inner join events e 
    on e."classId" = c.id
    where u.id = ${id}
    and  e."endDate" >= ${timePeriodInit}
    and e."endDate" <= ${timePeriodEnd}
    `;
        return {
            timePeriodInit,
            timePeriodEnd,
            total: events.length,
            events,
        };
    }
}
exports.ListEventsWorkLoadStudentService = ListEventsWorkLoadStudentService;
