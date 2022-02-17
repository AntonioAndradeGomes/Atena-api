import { Request, Response } from "express";
import { ListAllAcademicCenterService } from "../services/ListAllAcademicCenterService";

class ListAcademicCenterController{
  async hundle(request: Request, response: Response){
    const page = Number(request.query.page) || 1;
    const service = new ListAllAcademicCenterService();
    return response.status(200).json(await service.execute({page}));
  }
}

export {ListAcademicCenterController}
