import { Router } from "express";
import { AllDisciplineController } from "../controllers/AllDisciplinesController";
import { CreateDisciplineController } from "../controllers/CreateDisciplineController";
import { RetrieveDisciplineController } from "../controllers/RetrieveDisciplineController";
import { UpdateDisciplineController } from "../controllers/UpdateDisciplineController";
import { DeleteDisciplineController } from "../controllers/DeleteDisciplineController";
import { celebrate, Joi, Segments } from "celebrate";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";
import { isAcademicCenter } from "../../../middlewares/isAcademicCenter";

const disciplineRouter = Router();

disciplineRouter.get("/", new AllDisciplineController().hundle);

disciplineRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      initials: Joi.string().required(),
      courseLoad: Joi.number().required()
    }
  }),
  ensureAuthenticated, isAcademicCenter,
  new CreateDisciplineController().hundle
);

disciplineRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      initials: Joi.string().required(),
      courseLoad: Joi.number().required()
    }
  }),
  new RetrieveDisciplineController().hundle
);

disciplineRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      initials: Joi.string().required(),
      courseLoad: Joi.number().required()
    }
  }),
  ensureAuthenticated, isAcademicCenter,
  new UpdateDisciplineController().hundle
);

disciplineRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ensureAuthenticated, isAcademicCenter,
  new DeleteDisciplineController().hundle
);

export { disciplineRouter };
