import { Request, Response } from "express";
import { ListAllStudentsService } from "../services/ListAllStudentsService";

class ListAllStudentsController{
  async hundle(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListAllStudentsService();
    return response.status(200).json(await service.execute({page}));
  }
}

export {ListAllStudentsController}
