import { Request, Response } from "express";
import { DeleteAccessCodeService } from "../services/DeleteAccessCodeService";


class DeleteAccessCodeController{
  async delete(request: Request, response: Response){
    const {id} = request.params;
  
    const service = new DeleteAccessCodeService();
    return response.json(await service.execute(id));
  }
}

export {DeleteAccessCodeController}
