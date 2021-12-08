import { Request, Response } from "express";
import { CreateEventService } from "../services/CreateEventService";

class CreateEventController{
  async hundle(request: Request, response: Response){
    const {title, description, isActive, difficultyLevel, initDate, endDate} = request.body;
    const professorId = request.user_id;
    const service = new CreateEventService();
    return response.status(201).json(
      await service.execute({title, description, isActive, difficultyLevel, initDate, endDate, professorId,}
    ));
  }
}
export {CreateEventController}
