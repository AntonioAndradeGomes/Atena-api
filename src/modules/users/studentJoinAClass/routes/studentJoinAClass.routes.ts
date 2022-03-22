import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { ListStudentOnClassController } from "../controllers/ListStudentOnClassController";
import { AdminAddsStudentToClassController } from "../controllers/AdminAddsStudentToClassController";
import { AdminRemoveStudentFromClassController } from "../controllers/AdminRemoveStudentFromClassController";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { StudentJoinsTheClassController } from "../controllers/StudentJoinsTheClassController";
import { StudentWithdrawsFromClassController } from "../controllers/StudentWithdrawsFromClassController";

const listController = new ListStudentOnClassController();
const adminAddController = new AdminAddsStudentToClassController();
const adminRemoveController = new AdminRemoveStudentFromClassController();
const studentAddController = new StudentJoinsTheClassController();
const studentRemoveController = new StudentWithdrawsFromClassController();

const studentJoinAClass = Router();

//lista de relações entre estudantes e turma
studentJoinAClass.get("/", listController.handle);

//admin adicionar estudante na turma
studentJoinAClass.post(
  "/admin",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      classId: Joi.string().uuid().required(),
      studentId: Joi.string().uuid().required(),
    },
  }),
  adminAddController.hundle,
);

//admin remove estudante de uma turma
studentJoinAClass.delete(
  "/admin",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      classId: Joi.string().uuid().required(),
      studentId: Joi.string().uuid().required(),
    },
  }),
  adminRemoveController.hundle,
);

//estudante entra na turma
studentJoinAClass.post(
  "/student",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      classId: Joi.string().uuid().required(),
    },
  }),
  studentAddController.hundle,
);

//estudante sai da turma
studentJoinAClass.delete(
  "/student",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      classId: Joi.string().uuid().required(),
    },
  }),
  studentRemoveController.hundle
);


export { studentJoinAClass };
