import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserController";

const authRouter = Router();

authRouter.post('/login',celebrate({
  [Segments.BODY]: {
    mail: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), new AuthenticateUserController().handle);

export {authRouter}
