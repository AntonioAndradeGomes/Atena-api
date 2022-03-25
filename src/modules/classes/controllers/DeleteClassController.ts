import { Request, Response } from "express";
import { DeleteClassService } from "../services/DeleteClassService";

class DeleteClassController{
  async hundle(request: Request, response: Response){
    const idClass = request.params.id;
    const userId = request.user_id;
    const service = new DeleteClassService();
    const result = await service.execute({idClass, userId});

    return response.status(204).json(result);
  };
};

export { DeleteClassController };
