import { Request, Response } from "express";
import { AuthenticationService } from "../services/AuthenticationService";


class AuthenticationController{
  async hundle(request: Request, response: Response){
    const  {mail, password} = request.body;

    const service = new AuthenticationService();

    return response.status(201).json(await service.execute({mail, password}));
  }
}

export {AuthenticationController}
