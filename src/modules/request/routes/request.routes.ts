import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { CreateRequestController } from "../controllers/CreateRequestController";
import { DeleteRequestController } from "../controllers/DeleteRequestController";
import { ListRequestController } from "../controllers/ListRequestController";
import { UpdateRequestController } from "../controllers/UpdateRequestController";


const requestRouter = Router();
const listController = new ListRequestController();


requestRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      mail: Joi.string().email().required(),
      isCheck: Joi.boolean().required(),
    },
  }), 
  new CreateRequestController().hundle
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

  new UpdateRequestController().hundle,
);

requestRouter.delete(
  "/:id",
  celebrate({
  
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),

  new DeleteRequestController().hundle,
);

export {requestRouter}
