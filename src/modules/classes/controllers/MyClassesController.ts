import { Request, Response } from "express";
import { AllClassesService } from "../services/AllClassesService";
import { MyClassesService } from "../services/MyClassesService";

class MyClassesController{
  async hundle(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const professorId = request.user_id;
    const service = new MyClassesService();
    return response.status(200).json(await service.execute({page, professorId}));
  };

  
};

export { MyClassesController };
