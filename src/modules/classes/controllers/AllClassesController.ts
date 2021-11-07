import { Request, Response } from "express";
import { AllClassesService } from "../services/AllClassesService";

class AllClassesController{
  async hundle(request: Request, response: Response){
    const service = new AllClassesService();
    const result = await service.execute();

    return response.status(200).json(result);
  };
};

export { AllClassesController };
