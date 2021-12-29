import { Router } from "express";
import {refreshTokenRouter} from "../refrashToken/routes/refreshTokenAdmin.routes";
import {crudAdminRouter} from "../crudAdmin/routes/crudAdmin.routes";
import {authAdminRouter} from "../auth/routes/authAdmin.routes";

const adminRoutes = Router();

adminRoutes.use("/refrash", refreshTokenRouter);
adminRoutes.use("/core", crudAdminRouter);
adminRoutes.use("/auth", authAdminRouter);


export { adminRoutes }
