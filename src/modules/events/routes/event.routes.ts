import { Router } from "express";
import { AllEventsController } from "../controllers/AllEventsController";
import { CreateEventController } from "../controllers/CreateEventController";
import { RetrieveEventController } from "../controllers/RetrieveEventController";
import { UpdateEventController } from "../controllers/UpdateEventController";

import { celebrate, Joi, Segments } from "celebrate";
import { DeleteEventController } from "../controllers/DeleteEventController";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";
import { isProfessor } from "../../../middlewares/isProfessor";

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
  }), ensureAuthenticated, isProfessor, 
  new CreateEventController().hundle
);

eventRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  new RetrieveEventController().hundle
);


// Note: somente o dono do evento, o centro academico e o admin pode modificar o evento
// nesse caso só irei verificar se é o professor que quer modificar o evento
eventRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
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
  ensureAuthenticated, isProfessor,
  new UpdateEventController().hundle
);
/*
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
*/
eventRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  ensureAuthenticated, isProfessor,
  new DeleteEventController().hundle
);

export { eventRouter };
