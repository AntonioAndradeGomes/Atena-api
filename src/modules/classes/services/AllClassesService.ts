import prismaClient from "../../../prisma";

interface IClass {
  page: number;
  active: boolean | null;
}
class AllClassesService {
  async execute({ page, active }: IClass) {
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
          {
            name: "asc",
          },
        ],
        include: {
          discipline: true,
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

      const countClasses = await prismaClient.class.count();

      const lastPage = Math.ceil(countClasses / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;

      return {
        message: "Listing all classes in the course.",
        total: countClasses,
        lastPage,
        prev,
        next,
        data: classes,
      };
    }
    if (!active) {
      const classes = await prismaClient.class.findMany({
        skip,
        take: 10,
        where: {
          dateEndClass: {
            lt: new Date(),
          },
        },
        orderBy: [
          {
            dateEndClass: "desc",
          },
          {
            updatedAt: "desc",
          },
          {
            name: "asc",
          },
        ],
        include: {
          discipline: true,
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

      const countClasses = await prismaClient.class.count({
        where: {
          dateEndClass: {
            lt: new Date(),
          },
        },
      });

      const lastPage = Math.ceil(countClasses / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;

      return {
        message: "Listing the inactive classes of the course.",
        total: countClasses,
        lastPage,
        prev,
        next,
        data: classes,
      };
    }

    const classes = await prismaClient.class.findMany({
      skip,
      take: 10,
      where: {
        dateEndClass: {
          gte: new Date(),
        },
      },
      orderBy: [
        {
          dateEndClass: "desc",
        },
        {
          updatedAt: "desc",
        },
        {
          name: "asc",
        },
      ],
      include: {
        discipline: true,
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

    const countClasses = await prismaClient.class.count({
      where: {
        dateEndClass: {
          gte: new Date(),
        },
      },
    });

    const lastPage = Math.ceil(countClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      message: "Listing the active classes of the course.",
      total: countClasses,
      lastPage,
      prev,
      next,
      data: classes,
    };
  }
}

export { AllClassesService };
