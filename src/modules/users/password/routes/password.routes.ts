import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";
import { UpdatePasswordController } from "../controllers/UpdatePasswordController";


const updatePass = new UpdatePasswordController();
const forgotPass = new ForgotPasswordController();
const resetPass = new ResetPasswordController();

const passRoutes = Router();

//atualizar senha do user logado
passRoutes.patch(
  "/",
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      oldpassword: Joi.string().min(6).required(),
      newpassword: Joi.string().min(6).required(),
      newpasswordconfirmation: Joi.string().required().valid(Joi.ref('newpassword'))
    },
  }),
  updatePass.hundle
);


passRoutes.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      mail: Joi.string().email().required()
    }
  }),
  forgotPass.hundle
);

passRoutes.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      newpassword: Joi.string().min(6).required(),
      passwordConfirmation: Joi.string().min(6).required().valid(Joi.ref("newpassword"))
    }
  }),
  resetPass.hundle
);


export {passRoutes};
