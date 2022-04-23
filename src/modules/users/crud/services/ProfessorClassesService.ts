import prismaClient from "../../../../prisma";

interface IUser {
  page: number
}

class ListAllProfessorClassesService {
  async execute({ page }: IUser) {
    const skip = (page * 10) - 10;
    const classes = await prismaClient.class.findMany({
      where: {
        professorId: '6cb9b0c1-2013-43c7-a741-769a0bba9be9'  
      },
      include: {
        professor: true,
        discipline: true
      },
      skip,
      take: 10,
      orderBy: [
        {
          name: "asc"
        }
      ],
    });

    const countClasses = await prismaClient.class.count();

    const lastPage = Math.ceil(countClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage ? null : page + 1;

    return {
      "total": countClasses,
      lastPage,
      prev,
      next,
      "data": classes,
    };
  }
}
export { ListAllProfessorClassesService };
