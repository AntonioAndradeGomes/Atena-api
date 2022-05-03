import { Role } from "@prisma/client";
import prismaClient from "../../../../prisma";

interface IUser {
  page: number
}

class ListAllProfessorService {
  async execute({page}: IUser) {
    const skip = (page * 10) - 10;
    const users = await prismaClient.user.findMany({
      where: {
        roles:{
          has: Role.PROFESSOR,
        }
      },
      skip,
      take: 10,
      orderBy: [
        {
          name: "asc"
        }
      ],
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
    });

    const countUsers = await prismaClient.user.count({ where: {
      roles:{
        has: Role.PROFESSOR,
      }
    },});

    const lastPage = Math.ceil(countUsers / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      "total": countUsers,
      lastPage,
      prev,
      next,
      "data": users,
    };
  }
}
export { ListAllProfessorService };
