"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ListUserController_1 = require("../controllers/ListUserController");
const CreateUserController_1 = require("../controllers/CreateUserController");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const DeleteUserController_1 = require("../controllers/DeleteUserController");
const AdminDeleteUserController_1 = require("../controllers/AdminDeleteUserController");
const AdminUpdateUserController_1 = require("../controllers/AdminUpdateUserController");
const UpdateUserController_1 = require("../controllers/UpdateUserController");
const AdminInitCreateController_1 = require("../controllers/AdminInitCreateController");
const listController = new ListUserController_1.ListUserController();
const createController = new CreateUserController_1.CreateUserController();
const deleteController = new DeleteUserController_1.DeleteUserController();
const deleteAdminUser = new AdminDeleteUserController_1.AdminDeleteUserController();
const adminUpdateUser = new AdminUpdateUserController_1.AdminUpdateUserController();
const userUpdate = new UpdateUserController_1.UpdateUserController();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
//listagen de todos os usuarios
userRouter.get("/", listController.hundle);
//pegar um usuario pelo id
userRouter.get("/:id", (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), listController.hundleById);
//admin cria usuário
userRouter.post("/", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().min(3).required(),
        mail: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().min(6).required(),
        registration: celebrate_1.Joi.string().min(7),
        caEndDate: celebrate_1.Joi.date(),
        caInitDate: celebrate_1.Joi.date(),
        role: celebrate_1.Joi.string()
            .valid("ADMIN", "STUDENT", "PROFESSOR", "ACADEMIC_CENTER", "admin", "student", "professor", "academic_center")
            .required(),
    },
}), createController.hundle);
//criar admin inicial no sistema
userRouter.post('/admin/create/init/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        "jwtsecret": celebrate_1.Joi.string().required(),
    }
}), new AdminInitCreateController_1.AdminInitCreateController().hundle);
//usaurio se deleta no sistema
userRouter.delete("/", ensureAuthenticated_1.ensureAuthenticated, deleteController.hundle);
//admim deleta o usuario
userRouter.delete("/admin/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
}), deleteAdminUser.hundle);
//admin atualiza dados de usuarios
userRouter.patch("/admin/:id", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().min(3).required(),
        registration: celebrate_1.Joi.string().min(7).required(),
        caEndDate: celebrate_1.Joi.date(),
        caInitDate: celebrate_1.Joi.date(),
        role: celebrate_1.Joi.string()
            .valid("ADMIN", "STUDENT", "PROFESSOR", "ACADEMIC_CENTER", "admin", "student", "professor", "academic_center")
            .required(),
    },
}), adminUpdateUser.hundle);
//user atualiza seus dados - nesse caso so o nome mesmo
userRouter.patch("/", ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().min(3).required(),
    },
}), userUpdate.hundle);
