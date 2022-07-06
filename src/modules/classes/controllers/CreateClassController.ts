import { Request, Response } from "express";
import { CreateClassService } from "../services/CreateClassService";

class CreateClassController {
  async hundle(request: Request, response: Response) {
    const {
      name,
      academicYear,
      period,
      isRegularClass,
      professorId,
      disciplineId,
      dateInitClass,
      dateEndClass,
    } = request.body;
    const userId = request.user_id;
    const service = new CreateClassService();
    const result = await service.execute({
      name,
      academicYear,
      period,
      isRegularClass,
      professorId,
      userId,
      disciplineId,
      dateEndClass,
      dateInitClass,
    });

    return response.status(201).json(result);
  }
}

export { CreateClassController };
