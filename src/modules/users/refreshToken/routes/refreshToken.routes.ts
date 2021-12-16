import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { RefreshTokenController } from "../controllers/RefreshTokenController";


const refreshTokenRouter = Router();

refreshTokenRouter.post('/', ensureAuthenticated, new RefreshTokenController().handle);

export { refreshTokenRouter }
