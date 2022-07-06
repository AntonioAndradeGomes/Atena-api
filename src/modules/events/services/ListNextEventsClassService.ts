import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  classId: string;
  nextEvents: boolean;
  page: number;
}

class ListNextEventsClassService {
  async execute({ classId, nextEvents, page }: IRequest) {
    const classExists = await prismaClient.class.findUnique({
      where: { id: classId },
    });
    if (!classExists) {
      throw new AppError("Class not exists");
    }
    const skip = page * 10 - 10;
    const like = `${classId}%`;
    if (!nextEvents) {
      const events = await prismaClient.$queryRaw<[]>`
        select * from events e 
        where e."classId" like ${like}
        and e."endDate"  < current_date 
        order by e."endDate" desc
        limit 10 offset ${skip}
      `;
      const countEvents = await prismaClient.$queryRaw`
        select count(*) as total from events e 
        where e."classId" like ${like}
        and e."endDate"  < current_date 
      `;
      const lastPage = Math.ceil(countEvents[0]["total"] / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;

      return {
        message: `listing the past events of the class with the id ${classId} and the name ${classExists.name}`,
        actualPage: page,
        actualLength: events.length,
        total: countEvents[0]["total"],
        lastPage,
        prev,
        next,
        classId,
        nextEvents,
        events,
      };
    }

    const events = await prismaClient.$queryRaw<[]>`
        select * from events e 
        where e."classId" like ${like}
        and e."endDate"  >= current_date 
        order by e."endDate" asc
        limit 10 offset ${skip}
      `;
    const countEvents = await prismaClient.$queryRaw`
        select count(*) as total from events e 
        where e."classId" like ${like}
        and e."endDate"  >= current_date 
      `;
    const lastPage = Math.ceil(countEvents[0]["total"] / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      message: `listing upcoming class events with id ${classId} and name ${classExists.name}`,
      actualPage: page,
      actualLength: events.length,
      total: countEvents[0]["total"],
      lastPage,
      prev,
      next,
      classId,
      nextEvents,
      events,
    };
  }
}

export { ListNextEventsClassService };
