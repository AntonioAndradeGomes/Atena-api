import prismaClient from "../../../prisma";

class AllClassesService{
  async execute(){
    const classes = prismaClient.class.findMany();
    return classes;
  };
};

export { AllClassesService };
