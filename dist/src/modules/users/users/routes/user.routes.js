"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const UserCreateController_1 = require("../controllers/UserCreateController");
const ListUserController_1 = require("../controllers/ListUserController");
const UpdateUserController_1 = require("../controllers/UpdateUserController");
const ensureAuthenticated_1 = require("../../../../middlewares/ensureAuthenticated");
const DeleteUserController_1 = require("../controllers/DeleteUserController");
const ensureAuthenticatedAdmin_1 = require("../../../../middlewares/ensureAuthenticatedAdmin");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const createUserController = new UserCreateController_1.UserCreateController();
const listUserController = new ListUserController_1.ListUserController();
const updateUserController = new UpdateUserController_1.UpdateUserController();
const deleteUserController = new DeleteUserController_1.DeleteUserController();
userRouter.post('/add', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        mail: celebrate_1.Joi.string().email().required(),
        isStudent: celebrate_1.Joi.boolean().required(),
        isProfessor: celebrate_1.Joi.boolean().required(),
        isAcademicCenter: celebrate_1.Joi.boolean().required(),
        registration: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
        code: celebrate_1.Joi.string(),
        caInitDate: celebrate_1.Joi.required(),
        caEndDate: celebrate_1.Joi.required()
    }
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, createUserController.create);
//name, mail, registration, code, password
userRouter.post('/add/student', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        mail: celebrate_1.Joi.string().email().required(),
        registration: celebrate_1.Joi.string().required(),
        code: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required(),
    }
}), createUserController.createStudent);
userRouter.get('/', listUserController.listAll);
userRouter.get('/:id', listUserController.listById);
/* OBS:
  *quaquer tipo de usuário pode atualizar somente seu nome e registro
  *admin pode atualizar todos os dados
*/
//atualizar dados do usuário: name e registration e password
userRouter.patch('/', ensureAuthenticated_1.ensureAuthenticated, (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        registration: celebrate_1.Joi.string(),
        name: celebrate_1.Joi.string(),
        password: celebrate_1.Joi.required(),
    }
}), updateUserController.updateUser);
//atualizar todos os dados do user, rota só sera usada pelo admin
userRouter.put('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        isStudent: celebrate_1.Joi.boolean().required(),
        isProfessor: celebrate_1.Joi.boolean().required(),
        isAcademicCenter: celebrate_1.Joi.boolean().required(),
        registration: celebrate_1.Joi.string().required(),
        code: celebrate_1.Joi.string().required(),
        caInitDate: celebrate_1.Joi.string().required(),
        caEndDate: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.required(),
    }
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, updateUserController.updateAllDataUser);
//deletar usuario,rota também só sera usada pelo admin
userRouter.delete('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), ensureAuthenticatedAdmin_1.ensureAuthenticatedAdmin, deleteUserController.deleteUser);
