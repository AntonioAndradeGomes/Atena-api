import prismaClient from "../../../../prisma"

interface IStudentOnClass {
  page: number
}

class ListStudentsOnClassService{
  async execute({page}: IStudentOnClass) {
    const skip = (page * 10) - 10;
    const studentsOnClasses = await prismaClient.studentOnClasses.findMany({
      skip,
      take: 10,
      orderBy: [
        {
          studentId: "asc"
        }
      ],
      include: {
        class: true,
        student: true
      },
    });

    const countStudentsOnClasses = await prismaClient.studentOnClasses.count();

    const lastPage = Math.ceil(countStudentsOnClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next = page === lastPage ? null : page + 1;

    return {
      "total": countStudentsOnClasses,
      lastPage,
      prev,
      next,
      "data": studentsOnClasses,
    };
  }

} 

export {ListStudentsOnClassService}
