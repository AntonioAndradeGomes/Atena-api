import { Router } from "express";
import {refreshTokenRouter} from "../refreshToken/routes/refreshTokenAdmin.routes";
import {crudAdminRouter} from "../crudAdmin/routes/crudAdmin.routes";
import {authAdminRouter} from "../auth/routes/authAdmin.routes";

const adminRoutes = Router();

adminRoutes.use("/refresh", refreshTokenRouter);
adminRoutes.use("/core", crudAdminRouter);
adminRoutes.use("/auth", authAdminRouter);


export { adminRoutes }
