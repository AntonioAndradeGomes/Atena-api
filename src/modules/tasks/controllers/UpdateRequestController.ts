import { Request, Response } from "express";
import { UpdateTaskService } from "../services/UpdateTaskService";


class UpdateTaskController {
  async hundle(request: Request, response: Response) {
    const id = request.params.id;
    const { description, mail, isCheck } = request.body;
    const service = new UpdateTaskService();
    return response
      .json(await service.execute({ id, description, mail, isCheck }));
  }
}

export { UpdateTaskController };
