import offerRouter from '@modules/offers/infra/http/routes/offer.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/offers', offerRouter);

export default routes;
