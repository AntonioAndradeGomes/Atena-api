import { celebrate, Segments, Joi} from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { CADeleteProfessorController } from "../controllers/CADeleteUserController";
import { ListAcademicCenterController } from "../controllers/ListAcademicCenterController";

const listController = new ListAcademicCenterController();
const deleteController = new CADeleteProfessorController();

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

export { caRoutes };
