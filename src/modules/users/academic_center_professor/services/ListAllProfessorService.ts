import prismaClient from "../../../../prisma"

interface IProfessor {
  page: number
}

class ListAllProfessorService{
  async execute({page}: IProfessor) {
    const skip = (page * 10) - 10;
    const professors = await prismaClient.user.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          mail: "asc"
        }
      ],
      where: {
        isProfessor: true
      },
      select: {
        password: false,
        id: true,
        name: true,
        mail: true,
        isStudent: true,
        isProfessor: true,
        isAcademicCenter: true,
        registration: true,
        code: true,
        caInitDate: true,
        caEndDate: true,
        createdAt: true,
        updatedAt: true,
        academicCenterId: true,
        academicCenter: true,
      }
    });

    const countProfessors = await prismaClient.user.count({
      where: { isProfessor: true }
    });

    const lastPage = Math.ceil(countProfessors / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage ? null : page + 1;

    return {
      "total": countProfessors,
      lastPage,
      prev,
      next,
      "data": professors,
    };
  }

}

export {ListAllProfessorService}
