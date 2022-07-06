import { Request, Response } from "express";
import { RetrieveEventService } from "../services/RetrieveEventService";

class RetrieveEventController {
  async hundle(request: Request, response: Response) {
    const id = request.params.id;
    const serivce = new RetrieveEventService();
    const result = await serivce.execute(id);

    return response.status(200).json(result);
  }
}

export { RetrieveEventController };
