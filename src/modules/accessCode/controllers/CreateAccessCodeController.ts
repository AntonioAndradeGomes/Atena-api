import {Request, Response} from 'express';
import { CreateAccessCodeSerivce } from '../services/CreateAccessCodeSerivce';


class CreateAccessCodeController {
  async create(request: Request, response: Response) {
    const service = new CreateAccessCodeSerivce();
    const { expiredAt } = request.body;
    return response.json(await service.execute(expiredAt));
  }
}

export { CreateAccessCodeController }
