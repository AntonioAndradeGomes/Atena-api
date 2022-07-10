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
    });

    const countStudentsOnClasses = await prismaClient.studentOnClasses.count();

    const lastPage = Math.ceil(countStudentsOnClasses / 10);
    const prev = page === 1 ? null : page - 1;
    const next =page === lastPage || lastPage === 0 ? null : page + 1;

    return {
      "total": countStudentsOnClasses,
      actualLength: studentsOnClasses.length,
      lastPage,
      prev,
      next,
      "data": studentsOnClasses,
    };
  }

} 

export {ListStudentsOnClassService}
