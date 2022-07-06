import { Router } from "express";
import { AllDisciplineController } from "../controllers/AllDisciplinesController";
import { CreateDisciplineController } from "../controllers/CreateDisciplineController";
import { RetrieveDisciplineController } from "../controllers/RetrieveDisciplineController";
import { UpdateDisciplineController } from "../controllers/UpdateDisciplineController";
import { DeleteDisciplineController } from "../controllers/DeleteDisciplineController";
import { celebrate, Joi, Segments } from "celebrate";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";


const disciplineRouter = Router();

disciplineRouter.get("/", new AllDisciplineController().handle);

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
  ensureAuthenticated,
  new CreateDisciplineController().handle
);

disciplineRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),
  new RetrieveDisciplineController().handle
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
  ensureAuthenticated,
  new UpdateDisciplineController().handle
);

disciplineRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  ensureAuthenticated,
  new DeleteDisciplineController().handle
);

export { disciplineRouter };
