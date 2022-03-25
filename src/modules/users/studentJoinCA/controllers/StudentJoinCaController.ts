import { Request, Response } from "express";
import { StudentJoinCAService } from "../services/StudentJoinCAService";


class StudentJoinCaController{
  async hundle(request: Request, response: Response){
    const userId = request.user_id;
    const studentId = request.params.id;
    const {caEndDate, caInitDate} = request.body;
    const service = new StudentJoinCAService();
    return response.status(200).json(
      await service.execute({userId, studentId, caEndDate, caInitDate})
    );
  }
}

export {StudentJoinCaController};
