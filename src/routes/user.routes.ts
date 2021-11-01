import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";
import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";
import { UserController } from "../modules/users/controllers/UserController";


const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', new AuthenticateUserController().hundle);

userRouter.post('/add', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(), mail: Joi.string().email().required(), type: Joi.string().required(),
  }
}), userController.create);

userRouter.get('/', userController.readAll);

export { userRouter }
