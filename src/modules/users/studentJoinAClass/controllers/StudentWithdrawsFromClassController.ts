import {Request, Response} from "express";
import { StudentWithdrawsFromClassService } from "../services/StudentWithdrawsFromClassService";


class StudentWithdrawsFromClassController{ 
  async handle(request : Request, response: Response){
    const studentId = request.user_id;
    const {classId} = request.body;
    const service = new StudentWithdrawsFromClassService();
    return response.status(204).json(await service.execute({studentId, classId}));
  }
}

export {StudentWithdrawsFromClassController}

