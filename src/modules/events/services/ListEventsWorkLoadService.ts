import prismaClient from "../../../prisma";

interface IRequest {
  timePeriodInit: string | Date;
  timePeriodEnd: string | Date | null;
  classId: string;
  professorId: string;
}

class ListEventsWorkLoadService {
  async execute({
    timePeriodInit,
    classId,
    professorId,
    timePeriodEnd,
  }: IRequest) {
    const like1 = `${classId}%`;
    const like2 = `${professorId}%`;
    let events;
    if (!timePeriodEnd) {
      events = await prismaClient.$queryRaw<[]>`
    select e.id, e.title, e.description, e."isActive", e."createdAt" , e."updatedAt" , 
    e."difficultyLevel", e."endDate" , e."initDate" ,e."updatedAt",
    e."classId" , e."professorId" , c.id as id_class, c."name" name_class, c."academicYear" academic_year_class, 
    c."period" as period_class, c."disciplineId", 
    u."name" as name_professor, u.mail as mail_professor, u.registration as registration_professor
    from events e, "classes" c, users u 
    where  e."classId" = c.id and e."professorId" = u.id and  
    e."endDate" >= ${timePeriodInit} and e."endDate" <= c."dateEndClass"
    and e."classId" LIKE ${like1}  and e."professorId" LIKE ${like2}`;
    } else {
      events = await prismaClient.$queryRaw<[]>`
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

export { ListEventsWorkLoadService };
