import { Router } from "express";
import { disciplineRouter } from "../modules/disciplines/routes/discipline.routes";
import { classRouter } from "../modules/classes/routes/class.routes";
import { eventRouter } from "../modules/events/routes/event.routes";

import { accessCodeRouter } from "../modules/accessCode/routes/accessCode.routes";
import { requestRouter } from "../modules/request/routes/request.routes";
import { userRouter } from "../modules/users/crud/routes/users.routes";
import { professorRoutes } from "../modules/users/crud/routes/professor.routes";
import { studentRoutes } from "../modules/users/crud/routes/students.routes";
import { caRoutes } from "../modules/users/crud/routes/ca.routes";
import { authenticationRoutes } from "../modules/users/auth/routes/authentication.routes";
import { passRoutes } from "../modules/users/password/routes/password.routes";


const router = Router();
router.use("/user", userRouter);
router.use("/professor", professorRoutes);
router.use("/student", studentRoutes);
router.use("/academiccenter", caRoutes);
router.use("/auth", authenticationRoutes);
router.use("/password", passRoutes);
router.use("/event", eventRouter);
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);
router.use("/code", accessCodeRouter);
router.use("/request", requestRouter);

export {router};
