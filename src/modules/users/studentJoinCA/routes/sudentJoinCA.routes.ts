import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { StudentJoinCaController } from "../controllers/StudentJoinCaController";
import { UpdateDatesCAController } from "../controllers/UpdateDatesCAController";
import { RemoveStudentCAController } from "../controllers/RemoveStudentCAController";


const studentJoinCa = Router();

studentJoinCa.patch(
  '/join',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      caEndDate: Joi.date().required(),
      caInitDate: Joi.date().required(),
    },
  }),
  new StudentJoinCaController().hundle,
);

studentJoinCa.patch(
  '/update',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      caEndDate: Joi.date().required(),
      caInitDate: Joi.date().required(),
    },
  }),
  new UpdateDatesCAController().hundle,
);

studentJoinCa.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.string().uuid().required(),
    },
  }),
  new RemoveStudentCAController().hundle,
)

export { studentJoinCa };
