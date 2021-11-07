import { Request, Response } from "express";
import { CreateClassService } from "../services/CreateClasseService";

class CreateClassController{
  async hundle(request: Request, response: Response){
    const { name, academicYear, period } = request.body;
    const service = new CreateClassService();
    const result = await service.execute({ name, academicYear, period });

    return response.status(201).json(result);
  };
};

export { CreateClassController };
