import { Request, Response } from "express";
import { RetrieveClassService } from "../services/RetrieveClassService";

class RetrieveClassController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const service = new RetrieveClassService();
    const result = await service.execute(id);

    return response.status(200).json(result);
  };
};

export { RetrieveClassController };
