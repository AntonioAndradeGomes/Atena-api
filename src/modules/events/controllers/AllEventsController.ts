import { Request, Response } from "express";
import { AllEventsService } from "../services/AllEventsService";

class AllEventsController {
  async handle(request: Request, response: Response) {
    const page = Number(request.query.page) || 1;
    const service = new AllEventsService();
    const result = await service.execute({page});
    return response.json(result);
  }
}

export { AllEventsController }
