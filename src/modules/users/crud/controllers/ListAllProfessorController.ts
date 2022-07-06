import { Request, Response } from "express";
import { ListAllProfessorService } from "../services/ListAllProfessorService";

class ListAllProfessorController{
  async hundle(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListAllProfessorService();
    return response.status(200).json(await service.execute({page}));
  }
}

export {ListAllProfessorController}
