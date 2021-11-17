import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { isAcademicCenter } from "../../../../middlewares/isAcademicCenter";
import { CreateProfessorController } from "../controllers/CreateProfessorController";
import { ListProfessorController } from "../controllers/ListProfessorController";

const academicCenterRouter = Router();
const createProfessorController = new CreateProfessorController();
const listProfessorController = new ListProfessorController();

academicCenterRouter.post('/', ensureAuthenticated, isAcademicCenter, celebrate({
  [Segments.BODY]: {

    name: Joi.string().required(),
    mail: Joi.string().email().required(),
    registration: Joi.string().required(),
  }
}), createProfessorController.create);


academicCenterRouter.get('/', listProfessorController.listAll);

academicCenterRouter.get('/byid/:id', listProfessorController.listById);

academicCenterRouter.get('/byuser', ensureAuthenticated, isAcademicCenter, listProfessorController.listByUser);

export { academicCenterRouter }
