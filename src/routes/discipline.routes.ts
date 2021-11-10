import { request, Router } from "express";
import { AllDisciplineController } from "../modules/disciplines/controllers/AllDisciplinesController";
import { CreateDisciplineController } from "../modules/disciplines/controllers/CreateDisciplineController";
import { RetrieveDisciplineController } from "../modules/disciplines/controllers/RetrieveDisciplineController";
import { UpdateDisciplineController } from "../modules/disciplines/controllers/UpdateDisciplineController";
import { DeleteDisciplineController } from "../modules/disciplines/controllers/DeleteDisciplineController";
import { celebrate, Joi, Segments } from "celebrate";
import { join } from "@prisma/client/runtime";

const disciplineRouter = Router();

disciplineRouter.get("/", new AllDisciplineController().hundle);

disciplineRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      initials: Joi.string().required(),
      workload: Joi.number().required()
    }
  }),
  new CreateDisciplineController().hundle
);

disciplineRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      initials: Joi.string().required(),
      workload: Joi.number().required()
    }
  }),
  new RetrieveDisciplineController().hundle
);

disciplineRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      code: Joi.string().required(),
      name: Joi.string().required(),
      initials: Joi.string().required(),
      workload: Joi.number().required()
    }
  }),
  new UpdateDisciplineController().hundle
);

disciplineRouter.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      code: Joi.string(),
      name: Joi.string(),
      initials: Joi.string(),
      workload: Joi.number()
    }
  }),
  new UpdateDisciplineController().hundle
);

disciplineRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  new DeleteDisciplineController().hundle
);

export { disciplineRouter };
