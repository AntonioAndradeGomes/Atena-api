import { Request, Response } from "express";
import { RetrieveDisciplineService } from "../services/RetrieveDisciplineService";

class RetrieveDisciplineController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new RetrieveDisciplineService();
    const result = await service.execute(id);

    return response.status(200).json(result);
  };
};

export { RetrieveDisciplineController };
