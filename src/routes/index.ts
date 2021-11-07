import { Router } from "express";
import { eventRouter } from "../modules/events/routes/event.routes";
import { disciplineRouter } from "./discipline.routes";
import { userRouter } from "./user.routes";
import { classRouter } from "./class.routes";

const router = Router();

router.get('/', (req, res )=> {res.sendFile('index.html')});

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/discipline", disciplineRouter);
router.use("/class", classRouter);

export {router};
