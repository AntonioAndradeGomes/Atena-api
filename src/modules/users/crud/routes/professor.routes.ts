import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ListAllProfessorController } from "../controllers/ListAllProfessorController";
import { ListAllProfessorClassesController } from "../controllers/ListProfessorClassesController";

const listController = new ListAllProfessorController();
const listClassesController = new ListAllProfessorClassesController();

const professorRoutes = Router();

//listagem de professores
professorRoutes.get('/', listController.hundle);

// List all professor classes
professorRoutes.get('/classes', listClassesController.handle);


export { professorRoutes };
