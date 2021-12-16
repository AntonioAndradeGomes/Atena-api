import { Request, Response } from "express";
import { CreateDisciplineService } from "../services/CreateDisciplineService";

class CreateDisciplineController {
  async handle(request: Request, response: Response) {
    const { code, name, initials, courseLoad } = request.body;
    const academicCenterId = request.user_id;
    const service = new CreateDisciplineService();
    const result = await service.execute({
      code,
      name,
      initials,
      courseLoad,
      academicCenterId,
    });

    return response.status(201).json(result);
  }
}

export { CreateDisciplineController };
