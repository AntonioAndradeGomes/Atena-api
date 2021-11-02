import { Router } from "express";
import { eventRouter } from "./event.routes";

import { userRouter } from "./user.routes";

const router = Router();

router.get('/', (req, res )=> {res.sendFile('index.html')});

router.use("/event", eventRouter);
router.use("/users", userRouter);

export {router};
