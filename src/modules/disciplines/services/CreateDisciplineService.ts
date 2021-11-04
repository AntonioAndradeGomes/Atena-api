import prismaClient from "../../../prisma";

interface IRequest {
  code: string
  name: string
  initials: string
  workload: number
}

class CreateDisciplineService{
  async execute({code, name, initials, workload} : IRequest){
    const discipline = await prismaClient.discipline.create({
      data: {
        code,
        name,
        initials,
        workload,
      }}
    );
    return discipline;
  }
}

export { CreateDisciplineService };
