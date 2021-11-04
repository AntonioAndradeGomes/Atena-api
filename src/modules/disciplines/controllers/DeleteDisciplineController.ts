import { Request, Response } from "express";
import { DeleteDisciplineService } from "../services/DeleteDisciplineService";

class DeleteDisciplineController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new DeleteDisciplineService();
    const result = await service.execute(id);

    return response.status(200).json(result);
  };
};

export { DeleteDisciplineController }
