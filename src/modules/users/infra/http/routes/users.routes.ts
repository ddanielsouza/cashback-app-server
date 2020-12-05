import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const userController = new UsersController();

usersRouter.use(ensureAuthenticate);

usersRouter.post('/', userController.create);

export default usersRouter;
