import { Request, Response } from "express";
import { CreateEventService } from "../services/CreateEventService";

class CreateEventController{
  async handle(request: Request, response: Response){
    const {title, description, isActive, difficultyLevel, initDate, endDate,classId} = request.body;
    const professorId = request.user_id;
    const service = new CreateEventService();
    return response.status(201).json(
      await service.execute({title, description, isActive, difficultyLevel, initDate, endDate, professorId,classId}
    ));
  }
}
export {CreateEventController}
