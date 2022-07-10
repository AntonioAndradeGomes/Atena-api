import { Role } from "@prisma/client";
import { AppError } from "../../../errors/AppError";
import prismaClient from "../../../prisma";

interface IRequest {
  page: number;
  professorId: string;

  active: boolean | null;
}
class MyClassesService {
  async execute({ page, professorId, active }: IRequest) {
    const professor = await prismaClient.user.findUnique({
      where: { id: professorId },
    });

    if (!professor.roles.includes(Role.PROFESSOR)) {
      throw new AppError("User does not have this permission.", 401);
    }
    const skip = page * 10 - 10;
    if (active == null) {
      const classes = await prismaClient.class.findMany({
        skip,
        take: 10,
        orderBy: [
          {
            dateEndClass: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
        where: {
          professorId,
        },

        include: {
          discipline: true,
        },
      });

      const countClasses = await prismaClient.class.count({
        where: { professorId },
      });

      const lastPage = Math.ceil(countClasses / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;

      return {
        message: `Bringing all the classes taught by the professor: ${professor.name}`,
        actualPage: page,
        actualLength: classes.length,
        total: countClasses,
        lastPage,
        prev,
        next,
        active,
        data: classes,
      };
    }
    if (!active) {
      const classes = await prismaClient.class.findMany({
        skip,
        take: 10,
        orderBy: [
          {
            dateEndClass: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
        where: {
          professorId,
          dateEndClass: {
            lte: new Date(),
          },
        },

        include: {
          discipline: true,
        },
      });

      const countClasses = await prismaClient.class.count({
        where: {
          professorId,
          dateEndClass: {
            lte: new Date(),
          },
        },
      });

      const lastPage = Math.ceil(countClasses / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;

      return {
        message: `Bringing all inactive classes taught by the teacher: ${professor.name}`,
        actualPage: page,
        actualLength: classes.length,
        total: countClasses,
        lastPage,
        prev,
        next,
        active,
        data: classes,
      };
    }
    const classes = await prismaClient.class.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          dateEndClass: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      where: {
        professorId,
        dateEndClass: {
          gte: new Date(),
        },
      },

      include: {
        discipline: true,
      },
    });

    const countClasses = await prismaClient.class.count({
      where: {
        professorId,
        dateEndClass: {
          gte: new Date(),
        },
      },
    });

    const lastPage = Math.ceil(countClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      message: `Bringing all active classes taught by the teacher: ${professor.name}`,
      actualPage: page,
      actualLength: classes.length,
      total: countClasses,
      lastPage,
      prev,
      next,
      active,
      data: classes,
    };
  }
}

export { MyClassesService };
