import usersRouter from '@modules/users/infra/http/controllers/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/users', usersRouter);
export default routes;
