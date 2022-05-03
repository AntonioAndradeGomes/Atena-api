import prismaClient from "../../../prisma";

interface IRequest {
  page: number;
  professorId: string;
}
class MyClassesService{
  async execute({ page, professorId }: IRequest) {
    const skip = page * 10 - 10;
    const classes = await prismaClient.class.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
      where:{
        professorId
      },
      
      include: {
        discipline: true,
      },
    });

    const countClasses = await prismaClient.class.count({where: {professorId}});

    const lastPage = Math.ceil(countClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      actualPage: page,
      actualLength: classes.length,
      total: countClasses,
      lastPage,
      prev,
      next,
      data: classes,
    };
  }
}

export{MyClassesService}
