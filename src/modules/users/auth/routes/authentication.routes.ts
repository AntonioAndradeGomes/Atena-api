import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { RefreshTokenController } from "../controllers/RefrashTokenController";

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

authenticationRoutes.post("/refresh", ensureAuthenticated, new RefreshTokenController().hundle)

export {authenticationRoutes};
