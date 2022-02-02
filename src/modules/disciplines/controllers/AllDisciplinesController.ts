import { Request, Response } from "express";
import { AllDisciplineService } from "../services/AllDisciplineService";

class AllDisciplineController {
  async handle(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const service = new AllDisciplineService();
    const result = await service.execute({page});
    return response.json(result);
  };
};

export { AllDisciplineController };
