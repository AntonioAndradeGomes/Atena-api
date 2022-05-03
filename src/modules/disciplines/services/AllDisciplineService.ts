import prismaClient from "../../../prisma";

interface IDiscipline {
  page: number
}

class AllDisciplineService {
  async execute({page}: IDiscipline) {
    const skip = (page * 10) - 10;
    const disciplines = await prismaClient.discipline.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          name: "asc"
        }
      ],
      
    });

    const countDisciplines = await prismaClient.discipline.count();

    const lastPage = Math.ceil(countDisciplines / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      "total": countDisciplines,
      lastPage,
      prev,
      next,
      "data": disciplines,
    };
  }
}

export { AllDisciplineService };
