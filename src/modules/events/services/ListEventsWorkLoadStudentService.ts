import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  timePeriodInit: string | Date;
  id: string;
}


class ListEventsWorkLoadStudentService{
  async execute({timePeriodInit,id}: IRequest){
    const student = await prismaClient.user.findUnique({where: {id}});
    if(!student){
      throw new AppError("User not found", 401);
    }

    if(!student.roles.includes(Role.STUDENT)){
      throw new AppError("User not student", 401);
    }

    const events = await prismaClient.$queryRaw<[]>`
    select e.id, e.title, e.description, e."isActive", e."createdAt", e."updatedAt", e."difficultyLevel",
    e."endDate", e."initDate", e."classId", e."professorId", c.id as "id_class",c."name" as "name_class",
    c."academicYear" as "academic_year_class", c."period" as "period_class", c."disciplineId"
    from users u
    INNER JOIN "StudentOnClasses" soc on soc."studentId" = u.id
    inner join "class" c 
    on c.id = soc."classId" 
    inner join events e 
    on e."classId" = c.id
    where u.id = ${id}
    and  e."endDate" >= '2022-05-01' 
    and e."endDate" <= c."dateEndClass"
    `;

    return {
      timePeriodInit,
      total: events.length,
      events,
      query: `
      select e.id, e.title, e.description, e."isActive", e."createdAt", e."updatedAt", e."difficultyLevel",
      e."endDate", e."initDate", e."classId", e."professorId", c.id as "id_class",c."name" as "name_class",
      c."academicYear" as "academic_year_class", c."period" as "period_class", c."disciplineId"
      from users u
      INNER JOIN "StudentOnClasses" soc on soc."studentId" = u.id
      inner join "class" c 
      on c.id = soc."classId" 
      inner join events e 
      on e."classId" = c.id
      where u.id = ${id}
      and  e."endDate" >= '2022-05-01' 
      and e."endDate" <= c."dateEndClass"
      `
    }
  }

}

export {ListEventsWorkLoadStudentService}
