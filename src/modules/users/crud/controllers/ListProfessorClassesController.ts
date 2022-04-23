import { Request, Response } from "express";
import { ListAllProfessorClassesService } from "../services/ProfessorClassesService";

class ListAllProfessorClassesController {
  async handle(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListAllProfessorClassesService();
    return response.status(200).json(await service.execute({ page }));
  }
}

export { ListAllProfessorClassesController }
