import { Router } from "express";
import { AllEventsController } from "../controllers/AllEventsController";
import { CreateEventController } from "../controllers/CreateEventController";
import { RetrieveEventController } from "../controllers/RetrieveEventController";
import { UpdateEventController } from "../controllers/UpdateEventController";

import { celebrate, Joi, Segments } from "celebrate";
import { DeleteEventController } from "../controllers/DeleteEventController";

const eventRouter = Router();

eventRouter.get('/', new AllEventsController().hundle);

eventRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required()
    }
  }),
  new CreateEventController().hundle
);

eventRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  new RetrieveEventController().hundle
);

eventRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required()
    }
  }),
  new UpdateEventController().hundle
);

eventRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      isActive: Joi.boolean().required(),
      difficultyLevel: Joi.number().required(),
      initDate: Joi.date().required(),
      endDate: Joi.date().required()
    }
  }),
  new UpdateEventController().hundle
);

eventRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  new DeleteEventController().hundle
);

export { eventRouter };
