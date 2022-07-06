import { Router } from "express";
import { AllEventsController } from "../controllers/AllEventsController";
import { ProfessorCreateEventController } from "../controllers/ProfessorCreateEventController";
import { RetrieveEventController } from "../controllers/RetrieveEventController";
import { ProfessorUpdateEventController } from "../controllers/ProfessorUpdateEventController";
import { celebrate, Joi, Segments } from "celebrate";
import { ProfessorDeleteEventController } from "../controllers/ProfessorDeleteEventController";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";
import { AdminCreateEventController } from "../controllers/AdminCreateEventController";
import { AdminUpdateEventController } from "../controllers/AdminUpdateEventController";
import { AdminDeleteEventController } from "../controllers/AdminDeleteEventController";

const eventRouter = Router();

const controllerList = new AllEventsController();

eventRouter.get("/", controllerList.hundle);

eventRouter.get(
  "/professor",
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      allEvents: Joi.boolean().required(),
      activeEvents: Joi.boolean().required(),
    },
  }),
  controllerList.hundleProfessor
);

eventRouter.get(
  "/workload/general/:timePeriodInit/",
  celebrate({
    [Segments.PARAMS]: {
      timePeriodInit: Joi.date().required(),
    },
    [Segments.QUERY]: {
      classId: Joi.string().uuid(),
      professorId: Joi.string().uuid(),
    },
  }),
  controllerList.hundleWorkLoad
);

eventRouter.get(
  "/workload/student/:timePeriodInit/",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      timePeriodInit: Joi.date().required(),
    },
    [Segments.QUERY]: {
      classId: Joi.string().uuid(),
      professorId: Joi.string().uuid(),
    },
  }),
  controllerList.hundleWorkLoadStudent
);

eventRouter.get(
  "/next/:classId",
  celebrate({
    [Segments.PARAMS]: {
      classId: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      page: Joi.number(),
      nextEvents: Joi.boolean(),
    },
  }),
  controllerList.hundleNextsEvents,
);

eventRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  new RetrieveEventController().hundle
);

eventRouter.post(
  "/professor",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().integer().min(1).max(5).required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required(),
      classId: Joi.string().uuid().required(),
    },
  }),
  new ProfessorCreateEventController().hundle
);

eventRouter.post(
  "/admin",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().integer().min(1).max(5).required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required(),
      classId: Joi.string().uuid().required(),
    },
  }),
  new AdminCreateEventController().hundle
);

//o professor so pode alterar o evento dele
eventRouter.put(
  "/professor/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().integer().min(1).max(5).required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required(),
      classId: Joi.string().uuid().required(),
    },
  }),

  new ProfessorUpdateEventController().hundle
);

eventRouter.put(
  "/admin/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().integer().min(1).max(5).required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required(),
      classId: Joi.string().uuid().required(),
    },
  }),

  new AdminUpdateEventController().hundle
);

//o professor só pode deletar o evento associado a ele
eventRouter.delete(
  "/professor/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),

  new ProfessorDeleteEventController().hundle
);

eventRouter.delete(
  "/admin/:id",
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),

  new AdminDeleteEventController().hundle
);

export { eventRouter };
