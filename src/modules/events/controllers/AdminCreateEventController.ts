import { Request, Response } from "express";
import { AdminCreateEventService } from "../services/AdminCreateEventService";

class AdminCreateEventController {
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
    const userId = request.user_id;
    const service = new AdminCreateEventService();
    return response
      .status(201)
      .json(
        await service.execute({
          title,
          description,
          isActive,
          difficultyLevel,
          initDate,
          endDate,

          classId,
          userId,
        })
      );
  }
}
export { AdminCreateEventController };
