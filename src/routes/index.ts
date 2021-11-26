import { Router } from "express";
import { disciplineRouter } from "./discipline.routes";
import { classRouter } from "./class.routes";
import { eventRouter } from "../modules/events/routes/event.routes";
import { academicCenterRouter } from "../modules/users/academic_center/routes/academicCenterRoutes";
import { authRouter } from "../modules/users/routes/auth.routes";
import { userRouter } from "../modules/users/routes/user.routes";
import { accessCodeRouter } from "../modules/accessCode/routes/accessCode.routes";

const router = Router();

router.get('/', (req, res )=> {res.sendFile('index.html')});

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/users", authRouter);
router.use("/professor", academicCenterRouter);
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);
router.use("/code", accessCodeRouter);

export {router};
