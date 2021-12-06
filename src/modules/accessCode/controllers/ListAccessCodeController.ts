import { Request, Response } from "express";
import { ListAllAccessCodeService } from "../services/ListAllAccessCodeService";
import { ListByCodeAccessCodeService } from "../services/ListByCodeAccessCodeService";

class ListAccessCodeController{
  async listAll(request: Request, response: Response){
    const service = new ListAllAccessCodeService();
    return response.json(await service.execute());
  }

  async byCode(request : Request, response : Response){
    const service = new ListByCodeAccessCodeService();
    const {code} = request.params;
    return response.json(await service.execute(code) || {message: "No `" + code + "` code found"});
  }
}

export {ListAccessCodeController}
