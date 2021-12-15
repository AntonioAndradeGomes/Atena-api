import {Request, Response} from "express";
import { RemoveStudentToClassService } from "../services/RemoveStudentToClassService";

class RemoveStudentToClassController{ 
  async handle(request : Request, response: Response){
    const studentId = request.user_id;
    const {classId} = request.body;
    const service = new RemoveStudentToClassService();
    return response.status(204).json(await service.execute({studentId, classId}));
  }
}

export {RemoveStudentToClassController}
