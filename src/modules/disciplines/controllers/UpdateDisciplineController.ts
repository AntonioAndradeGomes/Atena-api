import { Request, Response } from "express";
import { UpdateDisciplineService } from "../services/UpdateDisciplineService";

class UpdateDisciplineController{
  async handle(request: Request, response: Response){
    const userId = request.user_id;
    const id = request.params.id;
    const { code, name, initials, courseLoad,} = request.body;
    const service = new UpdateDisciplineService();
    const result = await service.execute({id, code, name, initials, courseLoad, userId});

    return response.status(200).json(result);
  };
};

export { UpdateDisciplineController };
