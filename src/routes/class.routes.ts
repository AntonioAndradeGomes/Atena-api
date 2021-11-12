import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { AllClassesController } from "../modules/classes/controllers/AllClassesController";
import { CreateClassController } from "../modules/classes/controllers/CreateClassController";
import { DeleteClassController } from "../modules/classes/controllers/DeleteClassController";
import { RetrieveClassController } from "../modules/classes/controllers/RetrieveClasseController";
import { UpdateClassController } from "../modules/classes/controllers/UpdateClassController";

const classRouter = Router();

classRouter.get("/", new AllClassesController().hundle);
classRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      academicYear: Joi.string().required(),
      period: Joi.string().required(),
      isRegularClass: Joi.boolean().required()
    }
  }),
  new CreateClassController().hundle
);

classRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  new RetrieveClassController().hundle
);

classRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      academicYear: Joi.string().required(),
      period: Joi.string().required(),
      isRegularClass: Joi.boolean().required()
    }
  }),
  new UpdateClassController().hundle
);

classRouter.patch(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    },
    [Segments.BODY]: {
      name: Joi.string(),
      academicYear: Joi.string(),
      period: Joi.string(),
      isRegularClass: Joi.boolean()
    }
  }),
  new UpdateClassController().hundle
);

classRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  new DeleteClassController().hundle
);

export { classRouter };
