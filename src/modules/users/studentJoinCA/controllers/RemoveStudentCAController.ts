import { Request, Response } from "express";
import { RemoveStudentCAService } from "../services/RemoveStudentCAService";
import { StudentJoinCAService } from "../services/StudentJoinCAService";


class RemoveStudentCAController{
  async hundle(request: Request, response: Response){
    const userId = request.user_id;
    const studentId = request.params.id;

    const service = new RemoveStudentCAService();
    return response.status(200).json(
      await service.execute({userId, studentId, })
    );
  }
}

export {RemoveStudentCAController};
