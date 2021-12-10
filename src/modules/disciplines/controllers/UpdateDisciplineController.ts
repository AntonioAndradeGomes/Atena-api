import { Request, Response } from "express";
import { UpdateDisciplineService } from "../services/UpdateDisciplineService";

class UpdateDisciplineController{
  async hundle(request: Request, response: Response){
    const academicCenterId = request.user_id;
    const id = request.params.id;
    const { code, name, initials, courseLoad,} = request.body;
    const service = new UpdateDisciplineService();
    const result = await service.execute({id, code, name, initials, courseLoad, academicCenterId});

    return response.status(200).json(result);
  };
};

export { UpdateDisciplineController };
