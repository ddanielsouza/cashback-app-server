import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import DisableOffersController from '../controllers/DisableOffersController';
import EnableOffersController from '../controllers/EnableOffersController';
import OffersController from '../controllers/OffersController';

const offerController = new OffersController();
const enableOffersController = new EnableOffersController();
const disableOffersController = new DisableOffersController();
const offerRouter = Router();

offerRouter.get('/enable/', enableOffersController.index);

offerRouter.use(ensureAuthenticate);

offerRouter.post('/', offerController.create);
offerRouter.get('/', offerController.index);
offerRouter.get('/:id', offerController.getOfferById);
offerRouter.delete('/:id', offerController.delete);
offerRouter.put('/:id', offerController.update);

offerRouter.patch('/enable/:id', enableOffersController.enableOffer);

offerRouter.patch('/disable/:id', disableOffersController.disableOffer);

export default offerRouter;
