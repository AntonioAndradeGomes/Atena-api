import { Request, Response } from "express";
import { StudentJoinAcademicCenterService } from "../services/StudentJoinAcademicCenterService";

class StudentJoinAcademicCenterController {
  async handle(request: Request, response: Response) {
    const { mail } = request.body;
    const service = new StudentJoinAcademicCenterService();
    const result = await service.execute({mail});

    return response.status(200).json(result)
  };
};

export {StudentJoinAcademicCenterController};
