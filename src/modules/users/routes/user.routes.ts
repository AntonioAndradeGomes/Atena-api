import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";
import { UserCreateController } from "../controllers/UserCreateController";
import { ListUserController } from "../controllers/ListUserController";


const userRouter = Router();
const createUserController = new UserCreateController();

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

userRouter.get('/', new ListUserController().hundle);

/* TODO:
  *quaquer tipo de usaurio pode atualizar somente seu nome
  *admin pode atualizar todos os dados
*/


export { userRouter }
