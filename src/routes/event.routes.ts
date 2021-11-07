import { Router } from "express";
import { AllEventsController } from "../modules/events/controllers/AllEventsController";
import { CreateEventController } from "../modules/events/controllers/CreateEventController";
import { RetrieveEventController } from "../modules/events/controllers/RetrieveEventController";
import { UpdateEventController } from "../modules/events/controllers/UpdateEventController";
import { DeleteEventController } from "../modules/events/controllers/DeleteEventController";

const eventRouter = Router();

eventRouter.get('/', new AllEventsController().hundle);
eventRouter.post('/', new CreateEventController().hundle);
eventRouter.get('/:id', new RetrieveEventController().hundle);
eventRouter.put('/:id', new UpdateEventController().hundle);
eventRouter.patch('/:id', new UpdateEventController().hundle);
eventRouter.delete('/:id', new DeleteEventController().hundle);

export { eventRouter };
