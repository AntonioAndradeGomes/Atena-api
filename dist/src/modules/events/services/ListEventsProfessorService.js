"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventsProfessorService = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = require("../../../errors/AppError");
const prisma_1 = __importDefault(require("../../../prisma"));
class ListEventsProfessorService {
    async execute({ professorId, page, allEvents, activeEvents }) {
        const professor = await prisma_1.default.user.findUnique({
            where: { id: professorId },
        });
        if (!professor.roles.includes(client_1.Role.PROFESSOR)) {
            throw new AppError_1.AppError("User is not a professor", 401);
        }
        const skip = page * 10 - 10;
        if (allEvents) {
            const events = await prisma_1.default.event.findMany({
                skip,
                take: 10,
                where: {
                    professorId,
                },
                include: {
                    class: true,
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
            const countEvents = await prisma_1.default.event.count({
                where: { professorId },
            });
            const lastPage = Math.ceil(countEvents / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: "listing all events",
                professorId,
                allEvents,
                activeEvents,
                actualPage: page,
                actualLength: events.length,
                total: countEvents,
                events,
                lastPage,
                prev,
                next,
            };
        }
        else if (!activeEvents) {
            const events = await prisma_1.default.$queryRaw `
        select e.id, e.title, e.description, e."isActive",
        e."createdAt", e."updatedAt", e."difficultyLevel", e."endDate", e."initDate", e."classId", e."professorId",
        u."name" as name_professor, u.mail as mail_professor, u.roles as roles_professor, u.registration, u.code, u."caInitDate" ,u."caEndDate",
        u."createdAt" as created_at_professor, u."updatedAt" as updated_at_professor, c.id as id_class,
        c."name" as name_class, c."academicYear" as academic_year_class, c."period" as period_class, c."disciplineId"
        from events e, users u, "class" c 
        where e."professorId" = u.id and e."classId" = c.id and e."endDate" < current_date and e."professorId" = ${professorId}
        order by e."endDate" desc 
        limit 10 offset ${skip}`;
            const countEvents = await prisma_1.default.$queryRaw `select count(*) as total
      from events e
      where  e."endDate" < current_date and e."professorId" = ${professorId}`;
            const lastPage = Math.ceil(countEvents[0]["total"] / 10);
            const prev = page === 1 ? null : page - 1;
            const next = page === lastPage || lastPage === 0 ? null : page + 1;
            return {
                message: "listing the inactive events, events that have already happened.",
                professorId,
                allEvents,
                activeEvents,
                actualPage: page,
                actualLength: events.length,
                total: countEvents[0]["total"],
                lastPage,
                prev,
                next,
                events,
            };
        }
        const events = await prisma_1.default.$queryRaw `
      select e.id, e.title, e.description, e."isActive",
      e."createdAt", e."updatedAt", e."difficultyLevel", e."endDate", e."initDate", e."classId", e."professorId",
      u."name" as name_professor, u.mail as mail_professor, u.roles as roles_professor, u.registration, u.code, u."caInitDate" ,u."caEndDate",
      u."createdAt" as created_at_professor, u."updatedAt" as updated_at_professor, c.id as id_class,
      c."name" as name_class, c."academicYear" as academic_year_class, c."period" as period_class, c."disciplineId"
      from events e, users u, "class" c 
      where e."professorId" = u.id and e."classId" = c.id and e."endDate" >= current_date and e."professorId" = ${professorId}
      order by e."endDate" desc 
      limit 10 offset ${skip}`;
        const countEvents = await prisma_1.default.$queryRaw `select count(*) as total
    from events e
    where  e."endDate" >= current_date and e."professorId" = ${professorId}`;
        const lastPage = Math.ceil(countEvents[0]["total"] / 10);
        const prev = page === 1 ? null : page - 1;
        const next = page === lastPage || lastPage === 0 ? null : page + 1;
        return {
            message: "listing active events, events that are going to happen or are happening.",
            professorId,
            allEvents,
            activeEvents,
            actualPage: page,
            actualLength: events.length,
            total: countEvents[0]["total"],
            lastPage,
            prev,
            next,
            events,
        };
    }
}
exports.ListEventsProfessorService = ListEventsProfessorService;
