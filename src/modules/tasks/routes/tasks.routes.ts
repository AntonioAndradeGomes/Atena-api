import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateTaskController } from "../controllers/CreateTaskController";
import { DeleteTaskController } from "../controllers/DeleteTaskController";
import { ListTaskController } from "../controllers/ListRequestController";
import { UpdateTaskController } from "../controllers/UpdateRequestController";



const requestRouter = Router();
const listController = new ListTaskController();


requestRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      mail: Joi.string().email().required(),
      isCheck: Joi.boolean().required(),
    },
  }), 
  new CreateTaskController().hundle
);

requestRouter.get("/",listController.listAll);

requestRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  listController.listById
);

requestRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      mail: Joi.string().email().required(),
      isCheck: Joi.boolean().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  new UpdateTaskController().hundle,
);

requestRouter.delete(
  "/:id",
  celebrate({
  
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  new DeleteTaskController().hundle,
);

export {requestRouter}
