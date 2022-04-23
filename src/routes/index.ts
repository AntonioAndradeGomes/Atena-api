import { Router } from "express";
import { disciplineRouter } from "../modules/disciplines/routes/discipline.routes";
import { classRouter } from "../modules/classes/routes/class.routes";
import { eventRouter } from "../modules/events/routes/event.routes";

import { accessCodeRouter } from "../modules/accessCode/routes/accessCode.routes";
import { requestRouter } from "../modules/tasks/routes/tasks.routes";
import { userRouter } from "../modules/users/crud/routes/users.routes";
import { professorRoutes } from "../modules/users/crud/routes/professor.routes";
import { studentRoutes } from "../modules/users/crud/routes/students.routes";
import { caRoutes } from "../modules/users/crud/routes/ca.routes";
import { authenticationRoutes } from "../modules/users/auth/routes/authentication.routes";
import { passRoutes } from "../modules/users/password/routes/password.routes";
import { studentJoinAClass } from "../modules/users/studentJoinAClass/routes/studentJoinAClass.routes";
import { studentJoinCa } from "../modules/users/studentJoinCA/routes/sudentJoinCA.routes";


const router = Router();
router.use("/user", userRouter);
router.use("/professor", professorRoutes);
router.use("/student", studentRoutes);
router.use("/academiccenter", caRoutes);
router.use("/studentClass", studentJoinAClass);
router.use("/studentJoinCA", studentJoinCa);
router.use("/auth", authenticationRoutes);
router.use("/password", passRoutes);
router.use("/event", eventRouter);
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);
router.use("/code", accessCodeRouter);
router.use("/task", requestRouter);

export {router};
