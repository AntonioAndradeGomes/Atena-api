"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventsWorkLoadService = void 0;
const prisma_1 = __importDefault(require("../../../prisma"));
class ListEventsWorkLoadService {
    async execute({ timePeriodInit, classId, professorId, timePeriodEnd, }) {
        const like1 = `${classId}%`;
        const like2 = `${professorId}%`;
        let events;
        if (!timePeriodEnd) {
            events = await prisma_1.default.$queryRaw `
    select e.id, e.title, e.description, e."isActive", e."createdAt" , e."updatedAt" , 
    e."difficultyLevel", e."endDate" , e."initDate" ,e."updatedAt",
    e."classId" , e."professorId" , c.id as id_class, c."name" name_class, c."academicYear" academic_year_class, 
    c."period" as period_class, c."disciplineId", 
    u."name" as name_professor, u.mail as mail_professor, u.registration as registration_professor
    from events e, "classes" c, users u 
    where  e."classId" = c.id and e."professorId" = u.id and  
    e."endDate" >= ${timePeriodInit} and e."endDate" <= c."dateEndClass"
    and e."classId" LIKE ${like1}  and e."professorId" LIKE ${like2}`;
        }
        else {
            events = await prisma_1.default.$queryRaw `
    select e.id, e.title, e.description, e."isActive", e."createdAt" , e."updatedAt" , 
    e."difficultyLevel", e."endDate" , e."initDate" ,e."updatedAt",
    e."classId" , e."professorId" , c.id as id_class, c."name" name_class, c."academicYear" academic_year_class, 
    c."period" as period_class, c."disciplineId", 
    u."name" as name_professor, u.mail as mail_professor, u.registration as registration_professor
    from events e, "classes" c, users u 
    where  e."classId" = c.id and e."professorId" = u.id and  
    e."endDate" >= ${timePeriodInit} and e."endDate" <= ${timePeriodEnd}
    and e."classId" LIKE ${like1}  and e."professorId" LIKE ${like2}`;
        }
        return {
            timePeriodInit,
            timePeriodEnd,
            classId,
            professorId,
            total: events.length,
            events,
        };
    }
}
exports.ListEventsWorkLoadService = ListEventsWorkLoadService;
