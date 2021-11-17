import { Request, Response } from "express";
import { CreateEventService } from "../services/CreateEventService";

class CreateEventController{
  async hundle(request: Request, response: Response){
    const {title, description, isActive, difficultyLevel, initDate, endDate} = request.body;
    const service = new CreateEventService();
    const result = await service.execute(
      {
        title,
        description,
        isActive,
        difficultyLevel,
        initDate,
        endDate
      }
    );
    return response.status(201).json(result);
  }
}
export {CreateEventController}
