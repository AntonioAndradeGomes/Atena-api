import { Request, Response } from "express";
import { ProfessorDeleteEventService } from "../services/ProfessorDeleteEventService";

class ProfessorDeleteEventController{
  async handle(request: Request, response: Response){
    const id = request.params.id;
    const userId = request.user_id;
    const service = new ProfessorDeleteEventService();
    const result = await service.execute({id, userId});

    return response.status(204).json(result);
  };
};

export { ProfessorDeleteEventController };
