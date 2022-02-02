"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const AllEventsController_1 = require("../controllers/AllEventsController");
const CreateEventController_1 = require("../controllers/CreateEventController");
const RetrieveEventController_1 = require("../controllers/RetrieveEventController");
const UpdateEventController_1 = require("../controllers/UpdateEventController");
const celebrate_1 = require("celebrate");
const DeleteEventController_1 = require("../controllers/DeleteEventController");
const ensureAuthenticated_1 = require("../../../middlewares/ensureAuthenticated");
const isProfessor_1 = require("../../../middlewares/isProfessor");
const eventRouter = (0, express_1.Router)();
exports.eventRouter = eventRouter;
eventRouter.get('/', new AllEventsController_1.AllEventsController().handle);
eventRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        title: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        isActive: celebrate_1.Joi.boolean().required(),
        difficultyLevel: celebrate_1.Joi.number().required(),
        initDate: celebrate_1.Joi.date().required(),
        endDate: celebrate_1.Joi.date().required(),
        classId: celebrate_1.Joi.string().uuid().required()
    }
}), ensureAuthenticated_1.ensureAuthenticated, isProfessor_1.isProfessor, new CreateEventController_1.CreateEventController().handle);
eventRouter.get('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), new RetrieveEventController_1.RetrieveEventController().handle);
// Note: somente o dono do evento, o centro academico e o admin pode modificar o evento
// nesse caso só irei verificar se é o professor que quer modificar o evento
eventRouter.put('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    },
    [celebrate_1.Segments.BODY]: {
        title: celebrate_1.Joi.string().required(),
        description: celebrate_1.Joi.string().required(),
        isActive: celebrate_1.Joi.boolean().required(),
        difficultyLevel: celebrate_1.Joi.number().required(),
        initDate: celebrate_1.Joi.date().required(),
        endDate: celebrate_1.Joi.date().required(),
        classId: celebrate_1.Joi.string().uuid().required()
    }
}), ensureAuthenticated_1.ensureAuthenticated, isProfessor_1.isProfessor, new UpdateEventController_1.UpdateEventController().handle);
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
  new UpdateEventController().handle
);
*/
eventRouter.delete('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().required()
    }
}), ensureAuthenticated_1.ensureAuthenticated, isProfessor_1.isProfessor, new DeleteEventController_1.DeleteEventController().handle);
