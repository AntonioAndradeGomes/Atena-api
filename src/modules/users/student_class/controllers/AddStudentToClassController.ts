import {Request, Response} from "express";
import { AddStudentToClassService } from "../services/AddStudentToClassService";

class AddStudentToClassController{

  async handle(request : Request, response: Response){
    const studentId = request.user_id;
    const {classId} = request.body;
    const service = new AddStudentToClassService();
    return response.status(201).json(await service.execute({studentId, classId}));
  }
}

export {AddStudentToClassController}
