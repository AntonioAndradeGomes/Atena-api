import { Role } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import prismaClient from "../../../../prisma";

interface IRequest {
  studentId: string;
  active: boolean | null;
  page: number;
}

class SutentClassesService {
  async execute({ studentId, active, page }: IRequest) {
    const student = await prismaClient.user.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new AppError("User not found.");
    }
    if (!student.roles.includes(Role.STUDENT)) {
      throw new AppError("User not found.");
    }
    const skip = page * 10 - 10;
    if (active == null) {
      const classes = await prismaClient.studentOnClasses.findMany({
        skip,
        take: 10,
        where: { studentId: studentId },
        select: {
          class: {
            select: {
              id: true,
              name: true,
              academicCenterId: true,
              academicYear: true,
              createdAt: true,
              dateEndClass: true,
              dateInitClass: true,
              discipline: true,
              disciplineId: true,
              isRegularClass: true,
              period: true,
              professorId: true,
              professor: {
                select: {
                  academicCenterId: true,
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
              updatedAt: true,
            },
          },
          classId: true,
          createdAt: true,
          student: {
            select: {
              academicCenterId: true,
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
          studentId: true,
          updatedAt: true,
        },
        orderBy: [
          {
            class: {
              dateEndClass: "desc",
            },
          },
          {
            class: {
              updatedAt: "desc",
            },
          },
          {
            class: {
              name: "asc",
            },
          },
          {
            updatedAt: "desc",
          },
        ],
      });
      const countStudentsOnClasses = await prismaClient.studentOnClasses.count({
        where: { studentId: studentId },
      });
      const lastPage = Math.ceil(countStudentsOnClasses / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;
      return {
        total: countStudentsOnClasses,
        actualLength: classes.length,
        lastPage,
        prev,
        next,
        active,
        data: classes,
      };
    }
    
    if (!active) {
      const classes = await prismaClient.studentOnClasses.findMany({
        skip,
        take: 10,

        where: {
          studentId: studentId,
          class: {
            dateEndClass: {
              lte: new Date(),
            },
          },
        },
        select: {
          class: {
            select: {
              id: true,
              name: true,
              academicCenterId: true,
              academicYear: true,
              createdAt: true,
              dateEndClass: true,
              dateInitClass: true,
              discipline: true,
              disciplineId: true,
              isRegularClass: true,
              period: true,
              professorId: true,
              professor: {
                select: {
                  academicCenterId: true,
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
              updatedAt: true,
            },
          },
          classId: true,
          createdAt: true,
          student: {
            select: {
              academicCenterId: true,
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
          studentId: true,
          updatedAt: true,
        },
        orderBy: [
          {
            class: {
              dateEndClass: "desc",
            },
          },
          {
            class: {
              updatedAt: "desc",
            },
          },
          {
            class: {
              name: "asc",
            },
          },
          {
            updatedAt: "desc",
          },
        ],
      });
      const countStudentsOnClasses = await prismaClient.studentOnClasses.count({
        where: {
          studentId: studentId,
          class: {
            dateEndClass: {
              lte: new Date(),
            },
          },
        },
      });
      const lastPage = Math.ceil(countStudentsOnClasses / 10);
      const prev = page === 1 ? null : page - 1;
      const next = page === lastPage || lastPage === 0 ? null : page + 1;
      return {
        total: countStudentsOnClasses,
        actualLength: classes.length,
        lastPage,
        prev,
        next,
        active,
        data: classes,
      };
    }

    const classes = await prismaClient.studentOnClasses.findMany({
      skip,
      take: 10,

      where: {
        studentId: studentId,
        class: {
          dateEndClass: {
            gte: new Date(),
          },
        },
      },
      select: {
        class: {
          select: {
            id: true,
            name: true,
            academicCenterId: true,
            academicYear: true,
            createdAt: true,
            dateEndClass: true,
            dateInitClass: true,
            discipline: true,
            disciplineId: true,
            isRegularClass: true,
            period: true,
            professorId: true,
            professor: {
              select: {
                academicCenterId: true,
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
            updatedAt: true,
          },
        },
        classId: true,
        createdAt: true,
        student: {
          select: {
            academicCenterId: true,
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
        studentId: true,
        updatedAt: true,
      },
      orderBy: [
        {
          class: {
            dateEndClass: "desc",
          },
        },
        {
          class: {
            updatedAt: "desc",
          },
        },
        {
          class: {
            name: "asc",
          },
        },
        {
          updatedAt: "desc",
        },
      ],
    });
    const countStudentsOnClasses = await prismaClient.studentOnClasses.count({
      where: {
        studentId: studentId,
        class: {
          dateEndClass: {
            gte: new Date(),
          },
        },
      },
    });
    
    const lastPage = Math.ceil(countStudentsOnClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;
    return {
      total: countStudentsOnClasses,
      actualLength: classes.length,
      lastPage,
      prev,
      next,
      active,
      data: classes,
    };
  }
}

export { SutentClassesService };
