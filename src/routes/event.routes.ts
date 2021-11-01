import { Router } from "express";
import { AllEventsController } from "../modules/events/controllers/AllEventsController";
import { CreateEventController } from "../modules/events/controllers/CreateEventController";

const eventRouter = Router();

eventRouter.get('/', new AllEventsController().hundle);
eventRouter.post('/', new CreateEventController().hundle);

export {eventRouter}
