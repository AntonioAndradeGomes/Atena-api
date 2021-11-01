import { Request, Response } from "express";
import { AllEventsService } from "../services/AllEventsService";

class AllEventsController {
  async hundle(request: Request, response: Response) {
    const service = new AllEventsService();
    const result = await service.execute();
    return response.json(result);
  }
}

export { AllEventsController }
