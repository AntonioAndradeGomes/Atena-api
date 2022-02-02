import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { StudentJoinAcademicCenterController } from "../controllers/StudentJoinAcademicCenterController";

const studentAcademicCenterRouter = Router();

studentAcademicCenterRouter.patch(
  "/add",
  celebrate({
    [Segments.BODY]: {
      mail: Joi.string().email().required(),
    }
  }),
  new StudentJoinAcademicCenterController().handle
);

export {studentAcademicCenterRouter};
