import { Request, Response } from "express";
import { UpdateClassService } from "../services/UpdateClassService";

class UpdateClassController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const {name, academicYear, period, isRegularClass, professorId, disciplineId} = request.body;
    const academicCenterId = request.user_id;
    const service = new UpdateClassService();
    const result = await service.execute({id, name, academicYear, period, isRegularClass, professorId, academicCenterId, disciplineId});

    return response.status(200).json(result);
  };
};

export { UpdateClassController };
