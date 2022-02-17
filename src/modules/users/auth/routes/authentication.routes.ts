import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const authController = new AuthenticationController();

const authenticationRoutes = Router();

authenticationRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      mail: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  authController.hundle
);

export {authenticationRoutes};
