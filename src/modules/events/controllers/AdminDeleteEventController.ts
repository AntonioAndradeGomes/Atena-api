import { Request, Response } from "express";
import { AdminDeleteEventService } from "../services/AdminDeleteEventService";

class AdminDeleteEventController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const userId = request.user_id;
    const service = new AdminDeleteEventService();
    return response.status(204).json(
      await service.execute({id, userId})
    );
  }
}

export {AdminDeleteEventController}
