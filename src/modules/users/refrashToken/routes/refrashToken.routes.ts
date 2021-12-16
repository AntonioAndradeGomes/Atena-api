import { Router } from "express";
import { ensureAuthenticated } from "../../../../middlewares/ensureAuthenticated";
import { RefrashTokenController } from "../controllers/RefrashTokenController";


const refrashTokenRouter = Router();

refrashTokenRouter.post('/', ensureAuthenticated, new RefrashTokenController().hundle);

export {refrashTokenRouter}
