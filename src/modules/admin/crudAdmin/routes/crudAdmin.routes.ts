import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

const crudAdminRouter = Router();



crudAdminRouter.post('/', celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(6).required(),
    mail: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}),);

crudAdminRouter.get('/');

crudAdminRouter.get('/:id');

crudAdminRouter.put('/:id', celebrate({
  [Segments.BODY]: {
    username: Joi.string().min(6).required(),
    mail: Joi.string().email().required(),
    password: Joi.required(),
  }
}), )

crudAdminRouter.delete('/:id');
