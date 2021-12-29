import { Router } from "express";
import { disciplineRouter } from "../modules/disciplines/routes/discipline.routes";
import { classRouter } from "../modules/classes/routes/class.routes";
import { eventRouter } from "../modules/events/routes/event.routes";
import { academicCenterRouter } from "../modules/users/academic_center_professor/routes/academicCenterRoutes";
import { userRouter } from "../modules/users/users/routes/user.routes";
import { accessCodeRouter } from "../modules/accessCode/routes/accessCode.routes";
import { studentClassRouter } from "../modules/users/student_class/routes/studentClass.routes";
import { refreshTokenRouter } from "../modules/users/refreshToken/routes/refreshToken.routes";
import { authRouter } from "../modules/users/authentication/routes/auth.routes";
import { passwordRouter } from "../modules/users/users/routes/password.routes";
import { adminRoutes } from "../modules/admin/routes/admin.routes";
import { requestRouter } from "../modules/request/routes/request.routes";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/professor", academicCenterRouter);
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);
router.use("/code", accessCodeRouter);
router.use("/studentclass", studentClassRouter);
router.use('/refreshtoken', refreshTokenRouter);
router.use("/password", passwordRouter);
router.use("/admin", adminRoutes);
router.use("/request", requestRouter);

export {router};
