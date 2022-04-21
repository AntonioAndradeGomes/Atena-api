import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CreateStudentController } from "../controllers/CreateStudentController";
import { ListAllStudentsController } from "../controllers/ListAllStudentsController";

const createController = new CreateStudentController();
const listController = new ListAllStudentsController();

const studentRoutes = Router();

//estudante se cria no sistema usando o code
studentRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).required(),
      mail: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      registration: Joi.string().min(7).required(),
      code : Joi.string().required(),
    },
  }),
  createController.hundle,
);

//listagem de estudantes
studentRoutes.get('/', listController.hundle,);

export {studentRoutes};
