import { Request, Response } from "express";
import { AdminAddsStudentToClassService } from "../services/AdminAddsStudentToClassService";

class AdminAddsStudentToClassController {
  async hundle(request: Request, response: Response) {
    const adminId = request.user_id;
    const { classId, studentId } = request.body;
    const service = new AdminAddsStudentToClassService();
    return response
      .status(201)
      .json(await service.execute({ adminId, classId, studentId }));
  }
}

export { AdminAddsStudentToClassController };
