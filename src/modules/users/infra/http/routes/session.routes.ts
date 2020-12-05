import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionController = new SessionsController();
const sessionRouter = Router();

sessionRouter.post('/', sessionController.create);

sessionRouter.use(ensureAuthenticate);

sessionRouter.get('/', sessionController.authenticatedUser);

export default sessionRouter;
