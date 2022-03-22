import {Request, Response} from "express";
import { ListStudentsOnClassService } from "../services/ListStudentsOnClassService";

class ListStudentOnClassController{
  async handle(request : Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListStudentsOnClassService();
    return response.json(await service.execute({page}));
  }
}

export {ListStudentOnClassController}

