import { Router } from "express";

import { disciplineRouter } from "./discipline.routes";
import { classRouter } from "./class.routes";
import { authRouter } from "../modules/users/routes/auth.routes";
import { eventRouter } from "../modules/events/routes/event.routes";
import { userRouter } from "../modules/users/routes/user.routes";

const router = Router();

router.get('/', (req, res )=> {res.sendFile('index.html')});

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/users", authRouter)
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);

export {router};
