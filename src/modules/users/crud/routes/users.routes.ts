import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { ListUserController } from "../controllers/ListUserController";
import { CreateUserController } from "../controllers/CreateUserController";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { AdminDeleteUserController } from "../controllers/AdminDeleteUserController";
import { AdminUpdateUserController } from "../controllers/AdminUpdateUserController";
import { UpdateUserController } from "../controllers/UpdateUserController";

const listController = new ListUserController();
const createController = new CreateUserController();
const deleteController = new DeleteUserController();
const deleteAdminUser = new AdminDeleteUserController();
const adminUpdateUser = new AdminUpdateUserController();
const userUpdate = new UpdateUserController();

const userRouter = Router();

//listagen de todos os usuarios
userRouter.get("/", listController.hundle);

//pegar um usuario pelo id
userRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listController.hundleById
);

//admin cria usuário
userRouter.post(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
      mail: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      registration: Joi.string().min(7),
      caEndDate: Joi.date(),
      caInitDate: Joi.date(),
      role: Joi.string()
        .valid(
          "ADMIN",
          "STUDENT",
          "PROFESSOR",
          "ACADEMIC_CENTER",
          "admin",
          "student",
          "professor",
          "academic_center"
        )
        .required(),
    },
  }),
  createController.hundle
);

//usaurio se deleta no sistema
userRouter.delete("/", ensureAuthenticated, deleteController.hundle);

//admim deleta o usuario
userRouter.delete(
  "/admin/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteAdminUser.hundle
);

//admin atualiza dados de usuarios
userRouter.patch(
  "/admin/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
      registration: Joi.string().min(7).required(),
      caEndDate: Joi.date(),
      caInitDate: Joi.date(),
      role: Joi.string()
        .valid(
          "ADMIN",
          "STUDENT",
          "PROFESSOR",
          "ACADEMIC_CENTER",
          "admin",
          "student",
          "professor",
          "academic_center"
        )
        .required(),
    },
  }),
  adminUpdateUser.hundle
);

//user atualiza seus dados - nesse caso so o nome mesmo
userRouter.patch(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
    },
  }),
  userUpdate.hundle
);

export { userRouter };
