import {Request, Response} from "express";
import { ListStudentsOnClassService } from "../services/ListStudentsOnClassService";

class ListStudentOnClassServiceController{
  async handle(request : Request, response: Response){
    const service = new ListStudentsOnClassService();
    return response.json(await service.execute());
  }
}

export {ListStudentOnClassServiceController}
