import { Request, Response } from "express";
import { CreateClassService } from "../services/CreateClassService";

class CreateClassController{
  async hundle(request: Request, response: Response){
    const { name, academicYear, period, isRegularClass, professorId } = request.body;
    const academicCenterId = request.user_id;
    const service = new CreateClassService();
    const result = await service.execute({name, academicYear, period, isRegularClass, professorId, academicCenterId})

    return response.status(201).json(result);
  };
};

export { CreateClassController };
