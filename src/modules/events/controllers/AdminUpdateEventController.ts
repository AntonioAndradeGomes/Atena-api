import { Request, Response } from "express";
import { AdminUpdateEventService } from "../services/AdminUpdateEventService";

class AdminUpdateEventController {
  async handle(request: Request, response: Response) {
    const {
      title,
      description,
      isActive,
      difficultyLevel,
      initDate,
      endDate,
      classId,
    } = request.body;
    const id = request.params.id;
    const userId = request.user_id;
    const service = new AdminUpdateEventService();
    return response.status(200).json(
      await service.execute({
        classId,
        description,
        difficultyLevel,
        endDate,
        id,
        initDate,
        isActive,
        title,
        userId,
      })
    );
  }
}

export { AdminUpdateEventController };
