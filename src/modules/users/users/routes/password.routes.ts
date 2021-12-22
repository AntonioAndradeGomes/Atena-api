import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      mail: Joi.string().email().required()
    }
  }),
  forgotPasswordController.handle
)
passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref("password"))
    }
  }),
  resetPasswordController.handle
)

export { passwordRouter };
