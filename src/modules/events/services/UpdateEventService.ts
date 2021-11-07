import prismaClient from "../../../prisma";

interface IRequest{
  title: string
  description: string
  isActive: boolean
  difficultyLevel: number
  initDate: string
  endDate: string
}

class UpdateEventService{
  async execute(id: string, {title, description, isActive, difficultyLevel, initDate, endDate}: IRequest){
    const event = prismaClient.event.update({
      where: {
        id
      },
      data: {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate
      }
    });
    return event
  };
};

export { UpdateEventService };
