import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { ListAllProfessorController } from "../controllers/ListAllProfessorController";


const listController = new ListAllProfessorController();

const professorRoutes = Router();

//listagem de professores
professorRoutes.get('/', listController.hundle);

export {professorRoutes};
