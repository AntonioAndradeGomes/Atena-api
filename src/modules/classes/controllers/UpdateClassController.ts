import { Request, Response } from "express";
import { UpdateClassService } from "../services/UpdateClassService";

class UpdateClassController{
  async hundle(request: Request, response: Response){
    const id = request.params.id;
    const data = request.body;
    const service = new UpdateClassService();
    const result = await service.execute(id, data);

    return response.status(200).json(result);
  };
};

export { UpdateClassController };
