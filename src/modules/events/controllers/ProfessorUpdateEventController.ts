import { Request, Response } from "express";
import { ProfessorUpdateEventService } from "../services/ProfessorUpdateEventService";


class ProfessorUpdateEventController {
  async hundle(request: Request, response: Response) {
    const id = request.params.id;
    const userId = request.user_id;
    const {
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate,
      classId,
    } = request.body;
    const service = new ProfessorUpdateEventService();
    const result = await service.execute({
      id,
      userId,
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate,
      classId,
    });

    return response.status(200).json(result);
  }
}

export { ProfessorUpdateEventController };
