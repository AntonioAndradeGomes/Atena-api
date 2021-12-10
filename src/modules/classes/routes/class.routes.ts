import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../middlewares/ensureAuthenticated";
import { isAcademicCenter } from "../../../middlewares/isAcademicCenter";
import { AllClassesController } from "../controllers/AllClassesController";
import { CreateClassController } from "../controllers/CreateClassController";
import { DeleteClassController } from "../controllers/DeleteClassController";
import { RetrieveClassController } from "../controllers/RetrieveClasseController";
import { UpdateClassController } from "../controllers/UpdateClassController";

const classRouter = Router();

classRouter.get("/", new AllClassesController().hundle);
classRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      academicYear: Joi.string().required(),
      period: Joi.string().required(),
      isRegularClass: Joi.boolean().required(),
      professorId: Joi.string().uuid().required(),
      disciplineId: Joi.string().uuid().required(),
    }
  }),ensureAuthenticated, isAcademicCenter,
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
  "/:id",
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
  ensureAuthenticated, isAcademicCenter,
  new UpdateClassController().hundle
);
/*
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
*/
classRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),ensureAuthenticated, isAcademicCenter,
  new DeleteClassController().hundle
);

export { classRouter };
