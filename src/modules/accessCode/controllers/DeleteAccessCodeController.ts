import { Request, Response } from "express";
import { DeleteAccessCodeService } from "../services/DeleteAccessCodeService";


class DeleteAccessCodeController{
  async delete(request: Request, response: Response){
    const {id} = request.params;
  
    const service = new DeleteAccessCodeService();
    return response.status(204).json(await service.execute(id));
  }
}

export {DeleteAccessCodeController}
