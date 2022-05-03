import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";
import { AllClassesController } from "../controllers/AllClassesController";
import { CreateClassController } from "../controllers/CreateClassController";
import { DeleteClassController } from "../controllers/DeleteClassController";
import { MyClassesController } from "../controllers/MyClassesController";
import { RetrieveClassController } from "../controllers/RetrieveClasseController";
import { UpdateClassController } from "../controllers/UpdateClassController";

const classRouter = Router();

classRouter.get("/", new AllClassesController().hundle);
classRouter.get("/myClass",ensureAuthenticated, new MyClassesController().hundle);
classRouter.post(
  "/",ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      academicYear: Joi.string().required(),
      period: Joi.string().required(),
      isRegularClass: Joi.boolean().required(),
      professorId: Joi.string().uuid().required(),
      disciplineId: Joi.string().uuid().required(),
    }
  }),
  new CreateClassController().hundle
);

classRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  new RetrieveClassController().hundle
);

classRouter.put(
  "/:id",ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      academicYear: Joi.string().required(),
      period: Joi.string().required(),
      isRegularClass: Joi.boolean().required(),
      professorId: Joi.string().uuid().required(),
      disciplineId: Joi.string().uuid().required(),
    }
  }),
  
  new UpdateClassController().hundle
);

classRouter.delete(
  "/:id",
  ensureAuthenticated, 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  new DeleteClassController().hundle
);

export { classRouter };
