import { Request, Response } from "express";
import { UpdateEventService } from "../services/UpdateEventService";

class UpdateEventController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const professorId = request.user_id;
    const {title, description, isActive, difficultyLevel, initDate, endDate, classId} = request.body;
    const service = new UpdateEventService();
    const result = await service.execute({id, professorId, title, description, isActive, difficultyLevel, initDate, endDate,classId});

    return response.status(200).json(result);
  };
};

export { UpdateEventController };
