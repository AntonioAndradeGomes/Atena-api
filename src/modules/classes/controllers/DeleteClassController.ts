import { Request, Response } from "express";
import { DeleteClassService } from "../services/DeleteClassService";

class DeleteClassController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteClassService();
    const result = await service.execute(id);

    return response.status(204).json(result);
  };
};

export { DeleteClassController };
