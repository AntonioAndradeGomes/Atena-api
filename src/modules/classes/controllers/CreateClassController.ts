import { Request, Response } from "express";
import { CreateClassService } from "../services/CreateClassService";

class CreateClassController{
  async hundle(request: Request, response: Response){
    const { name, academicYear, period, isRegularClass } = request.body;
    const service = new CreateClassService();
    const result = await service.execute({ name, academicYear, period, isRegularClass })

    return response.status(201).json(result);
  };
};

export { CreateClassController };
