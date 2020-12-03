import UsersRepository from '@modules/users/infra/typeorm/respositories/UsersRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UsersRepository);
