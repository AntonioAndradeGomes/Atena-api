import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";
import { UserCreateController } from "../controllers/UserCreateController";
import { ListUserController } from "../controllers/ListUserController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";

const userRouter = Router();
const createUserController = new UserCreateController();
const listUserController = new ListUserController();
const updateUserController = new UpdateUserController();

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

userRouter.get('/', listUserController.listAll);

userRouter.get('/:id', listUserController.listById);

/* OBS:
  *quaquer tipo de usuário pode atualizar somente seu nome e registro
  *admin pode atualizar todos os dados
*/

//atualizar dados do usuário: name e registration
userRouter.patch('/', 
  ensureAuthenticated, celebrate({
    [Segments.BODY]: {
      registration: Joi.string(),
      name: Joi.string(),
    }
  }), updateUserController.updateUser);



export { userRouter }
