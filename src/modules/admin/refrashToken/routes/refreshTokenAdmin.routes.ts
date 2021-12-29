import { Router } from "express";
import { ensureAuthenticatedAdmin } from "../../../../middlewares/ensureAuthenticatedAdmin";
import { RefreshTokenAdminController } from "../controllers/RefreshTokenAdminController";

const refreshTokenRouter = Router();

refreshTokenRouter.post('/', ensureAuthenticatedAdmin, new RefreshTokenAdminController().handle);

export { refreshTokenRouter }
