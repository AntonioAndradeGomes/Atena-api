import prismaClient from "../../../prisma";

interface IRequest {
  code: string
  name: string
  initials: string
  workload: number
}

class UpdateDisciplineService{
  async execute(id: string, {code, name, initials, workload}: IRequest){
    const discipline = await prismaClient.discipline.update({
      where: { 
        id 
      },
      data: {
        code,
        name,
        initials,
        workload
      }
    });
    return discipline;
  };
};

export { UpdateDisciplineService };
