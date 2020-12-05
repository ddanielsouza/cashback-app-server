import UsersRepository from '@modules/users/infra/typeorm/respositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';
import IOfferRepository from '@modules/offers/repositories/IOfferRepository';
import OffersRepository from '@modules/offers/infra/typeorm/respositories/OfferRepository';

container.registerSingleton<IUserRepository>('UserRepository', UsersRepository);
container.registerSingleton<IOfferRepository>('OfferRepository', OffersRepository);
