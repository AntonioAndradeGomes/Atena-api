import prismaClient from "../../../prisma";

interface IClass {
  page: number
}
class AllClassesService{
  async execute({page}: IClass) {
    const skip = (page * 10) - 10;
    const classes = await prismaClient.class.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          name: "asc"
        }
      ],
      include: {
      
        discipline: true
      },
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
};

export { AllClassesService };
