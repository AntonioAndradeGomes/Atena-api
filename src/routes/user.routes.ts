import { Router } from "express";
import { AuthenticateUserController } from "../modules/users/controllers/AuthenticateUserController";

const userRouter = Router();

userRouter.post('/login', new AuthenticateUserController().hundle);

export {userRouter}
