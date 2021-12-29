import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AuthAdminController } from "../controllers/AuthAdminController";

const authAdminRouter = Router();


authAdminRouter.post('/', celebrate({
  [Segments.BODY]: {
    
    mail: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), new AuthAdminController().handle);

export {authAdminRouter}
