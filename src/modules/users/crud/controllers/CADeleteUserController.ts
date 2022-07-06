import { Request, Response } from "express";
import { CADeleteProfessorService } from "../services/CADeleteProfessorService";

class CADeleteProfessorController{
  async hundle(request: Request, response: Response){
    const caId = request.user_id;
    const userDeletedId = request.params.id;
    const service = new CADeleteProfessorService();
    return response.status(204).json(await service.execute({caId, userDeletedId}));
  }
}

export {CADeleteProfessorController}
