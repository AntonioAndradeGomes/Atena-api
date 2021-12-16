import { Request, Response } from "express";
import { DeleteEventService } from "../services/DeleteEventService";

class DeleteEventController{
  async handle(request: Request, response: Response){
    const id = request.params.id;
    const professorId = request.user_id;
    const service = new DeleteEventService();
    const result = service.execute(id, professorId);

    return response.status(204).json(result);
  };
};

export { DeleteEventController };
