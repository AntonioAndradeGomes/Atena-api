import { Request, Response } from "express";
import { UpdateRequestService } from "../services/UpdateRequestService";


class UpdateRequestController {
  async hundle(request: Request, response: Response) {
    const id = request.params.id;
    const { description, mail, isCheck } = request.body;
    const service = new UpdateRequestService();
    return response
      .json(await service.execute({ id, description, mail, isCheck }));
  }
}

export { UpdateRequestController };
