import {Request, Response} from "express";
import { UpdateExpiredAtAccessCodeService } from "../services/UpdateExpiredAtAccessCodeService";

class UpdateAccessCodeController{
  async execute(request: Request, response: Response){
    const {code} = request.params;
    const {expiredAt} = request.body; 
    const service = new UpdateExpiredAtAccessCodeService();
    return response.json(await service.execute({code, expiredAt}));
  }

}

export {UpdateAccessCodeController}
