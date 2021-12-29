import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticatedAdmin } from "../../../../middlewares/ensureAuthenticatedAdmin";
import { CreateAdminController } from "../controllers/CreateAdminController";
import { DeleteAdminController } from "../controllers/DeleteAdminController";
import { ListAdminController } from "../controllers/ListAdminController";
import { UpdateAdminController } from "../controllers/UpdateAdminController";

const crudAdminRouter = Router();
const listController = new ListAdminController();

crudAdminRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().min(6).required(),
      mail: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }), ensureAuthenticatedAdmin,
  new CreateAdminController().hundle
);

crudAdminRouter.get("/", ensureAuthenticatedAdmin,listController.listAll);

crudAdminRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticatedAdmin,
  listController.listById
);

crudAdminRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().min(6).required(),
      mail: Joi.string().email().required(),
      password: Joi.required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticatedAdmin,
  new UpdateAdminController().hundle,
);

crudAdminRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticatedAdmin,
  new DeleteAdminController().execute
);

export {crudAdminRouter}
