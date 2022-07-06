import {Request, Response} from "express";
import { AdminRemovesStudentFromClassService } from "../services/AdminRemovesStudentFromClassService";

class AdminRemoveStudentFromClassController{
  async hundle(request: Request, response: Response) {
    const adminId = request.user_id;
    const { classId, studentId } = request.body;
    const service = new AdminRemovesStudentFromClassService();

    return response.status(204).json(
      await service.execute({adminId, classId, studentId,})
    );
  }
}

export{AdminRemoveStudentFromClassController}
