import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest{
  timePeriodInit: string | Date;
  timePeriodEnd: string | Date;
  id: string;
}


class ListEventsWorkLoadStudentService{
  async execute({timePeriodInit,id, timePeriodEnd}: IRequest){
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
    c."academicYear" as "academic_year_class", c."period" as "period_class", c."disciplineId",
    u2.id as "professor_id", u2."name" as "professor_name"
    from users u
    INNER JOIN "students_on_classes" soc on soc."studentId" = u.id
    inner join "classes" c 
    on c.id = soc."classId" 
    inner join events e 
    on e."classId" = c.id
    inner join users u2 on
    u2.id = e."professorId"
    where u.id = ${id}
    and  e."endDate" >= ${timePeriodInit}
    and e."endDate" <= ${timePeriodEnd}
    `;

    delete student.password;
    return {
      timePeriodInit,
      timePeriodEnd,
      total: events.length,
      student,
      events,
    }
  }

}

export {ListEventsWorkLoadStudentService}
