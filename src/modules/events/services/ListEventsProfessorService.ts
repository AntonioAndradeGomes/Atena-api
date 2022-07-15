import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  professorId: string;
  page: number;
  activeEvents: boolean | null;
}

class ListEventsProfessorService {
  async execute({ professorId, page,  activeEvents }: IRequest) {
    const professor = await prismaClient.user.findUnique({
      where: { id: professorId },
    });
    if (!professor.roles.includes(Role.PROFESSOR)) {
      throw new AppError("User is not a professor.", 401);
    }
    const skip = page * 10 - 10;
    if (activeEvents == null) {
      const events = await prismaClient.event.findMany({
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
      const countEvents = await prismaClient.event.count({
        where: { professorId },
      });
      const lastPage = Math.ceil(countEvents / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;
      return {
        message: "Listing all events",
        professorId,
        activeEvents,
        actualPage: page,
        actualLength: events.length,
        total: countEvents,
        lastPage,
        prev,
        next,
        events,
        
      };
    } else if (!activeEvents) {
      const events = await prismaClient.event.findMany(
        {
          skip,
          take:10,
          orderBy:[
            {
              endDate: "desc",
            },
            {
              updatedAt: "desc",
            },
            
          ],
          where: {
            professorId,
            endDate: {
              lt: new Date(),
            },
            
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
            }
          }
        }
      );
      const countEvents = await prismaClient.event.count({
        where: {
          professorId,
          endDate: {
            lt: new Date(),
          },
          
        },
      });
      const lastPage = Math.ceil(countEvents / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;
      return {
        message: "listing the inactive events, events that have already happened.",
        professorId,
        activeEvents,
        actualPage: page,
        actualLength: events.length,
        total: countEvents,
        lastPage,
        prev,
        next,
        events,
      };
    }
    const events = await prismaClient.event.findMany(
      {
        skip,
        take:10,
        orderBy:[
          {
            endDate: "asc",
          },
          {
            updatedAt: "asc",
          },
          
        ],
        where: {
          professorId,
          endDate: {
            gte: new Date(),
          },
          
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
          }
        }
      }
    );
    const countEvents = await prismaClient.event.count({
      where: {
        professorId,
        endDate: {
          gte: new Date(),
        },
        
      },
    });
    const lastPage = Math.ceil(countEvents / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;
    return {
      message: "listing active events, events that are going to happen or are happening.",
      professorId,
      activeEvents,
      actualPage: page,
      actualLength: events.length,
      total: countEvents,
      lastPage,
      prev,
      next,
      events,
    };
  }
}

export { ListEventsProfessorService };
