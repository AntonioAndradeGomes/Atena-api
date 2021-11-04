import { Request, Response } from "express";
import { UpdateDisciplineService } from "../services/UpdateDisciplineService";

class UpdateDisciplineController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const data = request.body;
    const service = new UpdateDisciplineService();
    const result = await service.execute(id, data);

    return response.status(200).json(result)
  };
};

export { UpdateDisciplineController };
