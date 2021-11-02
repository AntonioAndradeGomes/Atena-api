import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";
import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";
import { UserController } from "../modules/users/controllers/UserController";
import { UserCreateController } from "../modules/users/controllers/UserCreateController";


const userRouter = Router();
const createUserController = new UserCreateController();
const userController = new UserController();

userRouter.post('/login',celebrate({
  [Segments.BODY]: {
    token: Joi.string().required(),
  }
}), new AuthenticateUserController().hundle);

userRouter.post('/add', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(), 
    mail: Joi.string().email().required(),
    isStudent: Joi.boolean().required(),
    isProfessor: Joi.boolean().required(),
    isAcademicCenter: Joi.boolean().required(),
    registration: Joi.string().required(),
    code: Joi.string(),
    caInitDate: Joi.string(),
    caEndDate: Joi.string()
  }
}), createUserController.create);

// TODO: falta verificar o code
userRouter.post('/add/student', celebrate({
  [Segments.BODY]: {
    token: Joi.string().required(),
    code: Joi.string().required(),
    registration: Joi.string().required(),
  }
}), createUserController.createStudent);

userRouter.get('/', userController.readAll);

export { userRouter }
