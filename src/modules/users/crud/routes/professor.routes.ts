import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CreateProfessorController } from "../controllers/CreateProfessorController";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { ListAllProfessorController } from "../controllers/ListAllProfessorController";

const createController = new CreateProfessorController();
const listController = new ListAllProfessorController();

const professorRoutes = Router();

//ca cria o professor
professorRoutes.post(
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
//listagem de professores
professorRoutes.get('/', listController.hundle);

export {professorRoutes};
