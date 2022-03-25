import {Request, Response} from "express";
import { StudentWithdrawsFromClassService } from "../services/StudentWithdrawsFromClassService";


class StudentWithdrawsFromClassController{ 
  async hundle(request : Request, response: Response){
    const studentId = request.user_id;
    const classId = request.params.id;
    const service = new StudentWithdrawsFromClassService();
    return response.status(204).json(await service.execute({studentId, classId}));
  }
}

export {StudentWithdrawsFromClassController}

