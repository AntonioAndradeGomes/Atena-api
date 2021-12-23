import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { isAcademicCenter } from "../../../../middlewares/isAcademicCenter";
import { CreateProfessorController } from "../controllers/CreateProfessorController";
import { DeleteProfessorController } from "../controllers/DeleteProfessorController";
import { ListProfessorController } from "../controllers/ListProfessorController";
import { UpdateProfessorController } from "../controllers/UpdateProfessorController";

const academicCenterRouter = Router();
const createProfessorController = new CreateProfessorController();
const listProfessorController = new ListProfessorController();
const updateProfessorController = new UpdateProfessorController();
const deleteProfessorController = new DeleteProfessorController();

academicCenterRouter.post(
  "/",
  ensureAuthenticated,
  isAcademicCenter,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      mail: Joi.string().email().required(),
      registration: Joi.string().required(),
    },
  }),
  createProfessorController.create
);

academicCenterRouter.get("/", listProfessorController.listAll);

academicCenterRouter.get(
  "/byid/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listProfessorController.listById
);

academicCenterRouter.get(
  "/byuser",
  ensureAuthenticated,
  isAcademicCenter,
  listProfessorController.listByUser
);

academicCenterRouter.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  isAcademicCenter,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      registration: Joi.string().required(),
      password: Joi.string().required()
    },
  }),
  updateProfessorController.update
);

academicCenterRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  isAcademicCenter,
  deleteProfessorController.delete
);

export { academicCenterRouter };