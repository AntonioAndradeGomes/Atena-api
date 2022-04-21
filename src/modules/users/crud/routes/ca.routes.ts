import { celebrate, Segments, Joi} from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CADeleteProfessorController } from "../controllers/CADeleteUserController";
import { CreateProfessorController } from "../controllers/CreateProfessorController";
import { ListAcademicCenterController } from "../controllers/ListAcademicCenterController";

const listController = new ListAcademicCenterController();
const deleteController = new CADeleteProfessorController();
const createController = new CreateProfessorController();

const caRoutes = Router();

//lista de ca's
caRoutes.get("/", listController.hundle);

//ca deleta o professor
caRoutes.delete(
  "/professor/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteController.hundle
);

//ca cria o professor
caRoutes.post(
  "/",
  
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
      mail: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      registration: Joi.string().min(7).required(),
    },
  }),
  ensureAuthenticated,
  createController.hundle,
  
);

export { caRoutes };
