import UsersRepository from '@modules/users/infra/typeorm/respositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

container.registerSingleton<IUserRepository>('UserRepository', UsersRepository);
