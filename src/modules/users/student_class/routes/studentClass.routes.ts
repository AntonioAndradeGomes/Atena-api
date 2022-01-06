import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { isStudent } from "../../../../middlewares/isStudent";
import { AddStudentToClassController } from "../controllers/AddStudentToClassController";
import { ListStudentOnClassServiceController } from "../controllers/ListStudentOnClassServiceController";
import { RemoveStudentToClassController } from "../controllers/RemoveStudentToClassController";


const studentClassRouter = Router();

studentClassRouter.get('/',
new ListStudentOnClassServiceController().handle);

studentClassRouter.post('/', ensureAuthenticated, isStudent, celebrate({
  [Segments.BODY]: {
    classId: Joi.string().uuid().required(),
  }
}), new AddStudentToClassController().handle);


studentClassRouter.delete('/', ensureAuthenticated, isStudent, celebrate({
  [Segments.BODY]: {
    classId: Joi.string().uuid().required(),
  }
}), new RemoveStudentToClassController().handle);

export {studentClassRouter}

