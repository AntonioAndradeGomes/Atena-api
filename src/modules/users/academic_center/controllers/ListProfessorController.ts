import { Request, Response } from "express";
import { ListAllProfessorService } from "../services/ListAllProfessorService";
import { ListByIdProfessorService } from "../services/ListByIdProfessorService";
import { ListByUserProfessorService } from "../services/ListByUserProfessorService";

class ListProfessorController{

  async listAll(request: Request, response: Response){
    const service = new ListAllProfessorService();
    return response.status(200).json(await service.execute());
  }

  async listById(request: Request, response: Response){
    const id = request.params.id;
    const service = new ListByIdProfessorService();
    return response.status(200).json(await service.execute(id));
  }

  async listByUser(request: Request, response: Response){
    const id = request.user_id;
    const service = new ListByUserProfessorService();
    return response.status(200).json(await service.execute(id));
  }
}

export {ListProfessorController}
