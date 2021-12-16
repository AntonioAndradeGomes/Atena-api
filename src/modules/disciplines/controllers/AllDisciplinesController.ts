import { Request, Response } from "express";
import { AllDisciplineService } from "../services/AllDisciplineService";

class AllDisciplineController {
  async handle(request: Request, response: Response) {
    const service = new AllDisciplineService();
    const result = await service.execute();
    return response.json(result);
  };
};

export { AllDisciplineController };
